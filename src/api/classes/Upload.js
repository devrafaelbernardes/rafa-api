const { storeFS } = require('../../config/multer');
const { PATH_BAG_IMAGES, PATH_MEDIA_IMAGES } = require('../../config/paths');

class Upload{
    constructor(){}

    async uploadImage(file, directory){
        let response = null;
        if(file && directory){
            try {
                console.log(file);
                await file.then(async(element_file) => {
                    const { createReadStream, filename, mimetype, encoding } = await element_file;
                    const stream = createReadStream();
                    const pathObj = await storeFS({ directory, stream, mimetype });
                    response = pathObj;
                    console.log(pathObj)
                })
                .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
                
            }    
        }
        return response;
    }

    uploadBagImage(file){
        return this.uploadImage(file, PATH_BAG_IMAGES);
    }

    uploadMediaImage(file){
        return this.uploadImage(file, PATH_MEDIA_IMAGES);
    }
}

module.exports = Upload;