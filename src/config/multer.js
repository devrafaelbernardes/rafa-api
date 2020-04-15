const multer = require('multer');
const { PATH_IMAGES } = require('../config/paths');
const path = require('path');
const fs = require('fs');

const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/gif',
];

const defineFiletype = (type) => {
    var filetype = '';
    if (type === 'image/gif') {
        filetype = 'gif';
    }else if (type === 'image/png') {
        filetype = 'png';
    }else if (type === 'image/jpeg') {
        filetype = 'jpg';
    }else if (type === 'video/mp4') {
        filetype = 'mp4';
    }
    return filetype;
}

const storageLOCAL = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH_IMAGES);
    },
    filename: (req, file, cb) => {
        var filetype = defineFiletype(file.mimetype);        
        file.key = ("img" + Date.now()) + '.' + filetype;
        cb(null, file.key)
    }
});

const storeFS = ({ directory, stream, mimetype }) => {
    const filetype = defineFiletype(mimetype);  
    let filename = "img" + (Math.floor(Math.random() * 1000) + Date.now()) + '.' + filetype;
    const result_path = path.resolve(directory, filename);

    return new Promise((resolve, reject) => {
        if(allowedMimes.includes(mimetype)){
            return stream
                .on('error', error => {
                    if (stream.truncated)
                        // delete the truncated file
                        fs.unlinkSync(result_path);
                    reject(error);
                })
                .pipe(fs.createWriteStream(result_path))
                .on('error', error => reject(error))
                .on('finish', () => resolve({ path : result_path, filename : filename }))
            ;
        }
        return reject(404);
    });
}

module.exports = {
    storeFS : storeFS,
    dest : PATH_IMAGES,
    storage : storageLOCAL,
    limits : {
        fileSize : 4 * 1024 * 1024,
    },
    fileFilter : (req, file, cb) => {
        var filetype = defineFiletype(file.mimetype);
        
        if(allowedMimes.includes(file.mimetype)){
            file.key = ("img" + Date.now() + file.mimetype + filetype) + '.' + filetype;
            cb(null, file.key)
        }else{
            cb(null, new Error('Invalid file type.'))
        }
    },
};