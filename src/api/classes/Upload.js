const { storeFS } = require('../../config/multer');

class Upload{
    constructor(){}

    async uploadImage(file){
        let response = null;
        if(file){
            try {
                await file.then(async(element_file) => {
                    const { createReadStream, filename, mimetype, encoding } = await element_file;
                    const stream = createReadStream();
                    const pathObj = await storeFS({ stream, mimetype });
                    response = pathObj;
                });
            } catch (error) {}    
        }
        return response;
    }
}

module.exports = Upload;