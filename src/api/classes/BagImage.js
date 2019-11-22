const Controller = require('./Controller');
const Image = require('./Image');
const { BAG_IMAGE } = require('../elementsSchema');

class BagImage extends Controller{
    constructor(){
        super();

        this.classImage = new Image();
    }

    async find(column, value){
        if(column && value){
            try {
                const bag_image = await this.getDb.from(BAG_IMAGE.TABLE_NAME)
                    .where({
                        [column] : value,
                        [BAG_IMAGE.ACTIVE] : true
                    })
                    .first();

                if(bag_image){
                    return {
                        ...bag_image,
                    };
                }
            } catch (error) {}
        }
        return null;
    }

    findById(id){
        return this.find(BAG_IMAGE.ID, id);
    }

    async findByBagId(bag_id){
        if(bag_id){
            let images = await this.getDb.from(BAG_IMAGE.TABLE_NAME)
                .select(BAG_IMAGE.IMAGE)
                .where({ [BAG_IMAGE.BAG] : bag_id });

            if(images && images.length > 0){
                let response = [];
                for(let key in images){
                    let image = await this.classImage.findById(images[key][BAG_IMAGE.IMAGE]);
                    if(image){
                        response.push(image);
                    }
                }
                if(response.length > 0){
                    return response;
                }
            }
        }
        return null;
    }
}

module.exports = BagImage;