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
            try {
                let images = await this.getDb.from(BAG_IMAGE.TABLE_NAME)
                    .select(BAG_IMAGE.IMAGE)
                    .where({ [BAG_IMAGE.BAG] : bag_id, [BAG_IMAGE.ACTIVE] : true });

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
            } catch (error) {}
        }
        return null;
    }

    async findFirstImageByBagId(bag_id){
        if(bag_id){
            try {
                let image = await this.getDb.from(BAG_IMAGE.TABLE_NAME)
                    .select(BAG_IMAGE.IMAGE)
                    .where({ [BAG_IMAGE.BAG] : bag_id, [BAG_IMAGE.ACTIVE] : true })
                    .first();

                if(image){
                    return this.classImage.findById(image[BAG_IMAGE.IMAGE]);
                }    
            } catch (error) {}
        }
        return null;
    }

    async findSecondImageByBagId(bag_id){
        if(bag_id){
            try {
                let images = await this.getDb.from(BAG_IMAGE.TABLE_NAME)
                    .select(BAG_IMAGE.IMAGE)
                    .where({ [BAG_IMAGE.BAG] : bag_id, [BAG_IMAGE.ACTIVE] : true })
                    .limit(2);

                if(images && images.length > 1){ // > 1, for second image
                    return this.classImage.findById(images[1][BAG_IMAGE.IMAGE]);
                }    
            } catch (error) {}
        }
        return null;
    }
}

module.exports = BagImage;