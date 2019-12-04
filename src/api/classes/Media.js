const Controller = require('./Controller');
const Image = require('./Image');
const { MEDIA } = require('../elementsSchema');
const { encryptCode } = require('../encryptFunctions');

class Media extends Controller{
    constructor(){
        super();

        this.classImage = new Image();
    }

    async add(link, image_id){
        if(link && image_id){
            try {
                let last_position = await this.maxPosition();
                last_position = last_position + 1;
                let code = await encryptCode(link+image_id+last_position);
                
                let response = await this.getDb.from(MEDIA.TABLE_NAME)
                    .insert({
                        [MEDIA.IMAGE] : image_id,
                        [MEDIA.LINK] : link,
                        [MEDIA.POSITION] : last_position,
                        [MEDIA.CODE] : code,
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
                const media = await this.getDb.from(MEDIA.TABLE_NAME)
                    .where({ [column] : value })
                    .first();

                if(media){
                    return {
                        ...media,
                        image : () => this.classImage.findById(media[MEDIA.IMAGE])
                    };
                }
            } catch (error) {}
        }
        return null;
    }

    findById(id){
        return this.find(MEDIA.ID, id);
    }

    async findAll(){
        try{
            let medias = await this.getDb.from(MEDIA.TABLE_NAME)
                .select(MEDIA.ID)
                .where({ [MEDIA.ACTIVE] : true })
                .orderBy(MEDIA.POSITION, 'asc');
                
            if(medias && medias.length > 0){
                return medias.map(async(item) => {
                    let media = await this.findById(item[MEDIA.ID]);
                    if(media){
                        return media;
                    }
                });
            }
        }catch(e){
        }
        return null;
    }

    async count(){
        try{
            let response = await this.getDb.from(MEDIA.TABLE_NAME)
                .where({ [MEDIA.ACTIVE] : true })
                .count({ count : MEDIA.ID })
                .first();
            if(response && response.count){
                return response.count;
            }
        } catch (error) {}
        return 0;
    }

    async maxPosition(){
        try {
            var response = await this.getDb.from(MEDIA.TABLE_NAME)
                .where({ [MEDIA.ACTIVE] : true })
                .max({ max : MEDIA.POSITION })
                .first();
            if(response && response.max){
                return response.max;
            }   
        } catch (error) {}
        return 0;
    }
}

module.exports = Media;