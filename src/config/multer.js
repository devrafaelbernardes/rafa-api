const multer = require('multer');
const { PATH_IMAGES } = require('../config/paths');

const defineFiletype = (type) => {
    var filetype = '';
    if (type === 'image/gif') {
        filetype = 'gif';
    }else if (type === 'image/png') {
        filetype = 'png';
    }else if (type === 'image/jpeg') {
        filetype = 'jpg';
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

module.exports = {
    dest : PATH_IMAGES,
    storage : storageLOCAL,
    limits : {
        fileSize : 4 * 1024 * 1024,
    },
    fileFilter : (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/gif',
        ];
        var filetype = defineFiletype(file.mimetype);
        
        if(allowedMimes.includes(file.mimetype)){
            file.key = ("img" + Date.now() + file.mimetype + filetype) + '.' + filetype;
            cb(null, file.key)
        }else{
            cb(null, new Error('Invalid file type.'))
        }
    },
};