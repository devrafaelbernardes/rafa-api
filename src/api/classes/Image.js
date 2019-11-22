const Controller = require('./Controller');
const { IMAGE } = require('../elementsSchema');
const { PORT, isDevelopment } = require('../../config/server');

class Image extends Controller{
    constructor(){
        super();
    }

    async add(location){
        if(location){
            try {
                let response = await this.getDb.from(IMAGEM.TABLE_NAME)
                    .insert({
                        [IMAGE.LOCATION] : location
                    });
                if(response && response[0]){
                    return response[0];
                }
            } catch (error) {}
        }
        return null;
    }

    async find(column, value){
        if(column && value){
            try {
                const image = await this.getDb.from(IMAGE.TABLE_NAME)
                    .where({ [column] : value })
                    .first();

                if(image){
                    return {
                        ...image,
                        [IMAGE.LOCATION] : this.urlShowImage(image[IMAGE.LOCATION])
                    };
                }
            } catch (error) {}
        }
        return null;
    }

    findById(id){
        return this.find(IMAGE.ID, id);
    }

    urlShowImage(name){
        if(isDevelopment){
            return 'http://localhost:'+PORT+'/image/'+name;
        }
        return 'http://api.rbernardes.com.br/image/'+name;
    }
}

module.exports = Image;