const Controller = require('./Controller');
const { IMAGE } = require('../elementsSchema');
const { LINK_IMAGES } = require('../../config/server');

class Image extends Controller{
    constructor(){
        super();
    }

    async add(location){
        if(location){
            try {
                let response = await this.getDb.from(IMAGE.TABLE_NAME)
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

    async find(column, value, directory){
        if(column && value){
            try {
                const image = await this.getDb.from(IMAGE.TABLE_NAME)
                    .where({ [column] : value })
                    .first();

                if(image){
                    return {
                        ...image,
                        [IMAGE.LOCATION] : this.urlShowImage(image[IMAGE.LOCATION], directory)
                    };
                }
            } catch (error) {}
        }
        return null;
    }

    findById(id, directory){
        return this.find(IMAGE.ID, id, directory);
    }

    urlShowImage(name, directory){
        directory = directory ? directory+"/" : "";
        return LINK_IMAGES + directory + name;
    }
}

module.exports = Image;