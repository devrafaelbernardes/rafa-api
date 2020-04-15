const Controller = require('./Controller');
const Image = require('./Image');
const { SOCIAL_NETWORK } = require('../elementsSchema');
const { encryptCode } = require('../encryptFunctions');
const DIRECTORY_SOCIAL_NETWORKS = 'social_networks';

class SocialNetwork extends Controller{
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
                
                let response = await this.getDb.from(SOCIAL_NETWORK.TABLE_NAME)
                    .insert({
                        [SOCIAL_NETWORK.IMAGE] : image_id,
                        [SOCIAL_NETWORK.LINK] : link,
                        [SOCIAL_NETWORK.POSITION] : last_position,
                        [SOCIAL_NETWORK.CODE] : code,
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
                const social_network = await this.getDb.from(SOCIAL_NETWORK.TABLE_NAME)
                    .where({ [column] : value })
                    .first();

                if(social_network){
                    return {
                        ...social_network,
                        image : () => this.classImage.findById(social_network[SOCIAL_NETWORK.IMAGE], DIRECTORY_SOCIAL_NETWORKS)
                    };
                }
            } catch (error) {}
        }
        return null;
    }

    findById(id){
        return this.find(SOCIAL_NETWORK.ID, id);
    }

    findByCode(code){
        return this.find(SOCIAL_NETWORK.CODE, code);
    }

    async findAll(){
        try{
            let social_networks = await this.getDb.from(SOCIAL_NETWORK.TABLE_NAME)
                .select(SOCIAL_NETWORK.ID)
                .where({ [SOCIAL_NETWORK.ACTIVE] : true })
                .orderBy(SOCIAL_NETWORK.POSITION, 'asc');
                
            if(social_networks && social_networks.length > 0){
                return social_networks.map(async(item) => {
                    let social_network = await this.findById(item[SOCIAL_NETWORK.ID]);
                    if(social_network){
                        return social_network;
                    }
                });
            }
        }catch(e){
        }
        return null;
    }

    async remove(id){
        if(id){
            try {
                let response = await this.getDb.from(SOCIAL_NETWORK.TABLE_NAME)
                    .update({ [SOCIAL_NETWORK.ACTIVE] : false })
                    .where({ [SOCIAL_NETWORK.ID] : id });
                if(response){
                    return true;
                }
            } catch (error) {}
        }
        return false;
    }

    async count(){
        try{
            let response = await this.getDb.from(SOCIAL_NETWORK.TABLE_NAME)
                .where({ [SOCIAL_NETWORK.ACTIVE] : true })
                .count({ count : SOCIAL_NETWORK.ID })
                .first();
            if(response && response.count){
                return response.count;
            }
        } catch (error) {}
        return 0;
    }

    async maxPosition(){
        try {
            var response = await this.getDb.from(SOCIAL_NETWORK.TABLE_NAME)
                .where({ [SOCIAL_NETWORK.ACTIVE] : true })
                .max({ max : SOCIAL_NETWORK.POSITION })
                .first();
            if(response && response.max){
                return response.max;
            }   
        } catch (error) {}
        return 0;
    }

    async updatePosition(id, position){
        if(id && position >= 0){
            try {
                const response = await this.getDb.from(SOCIAL_NETWORK.TABLE_NAME)
                    .update({
                        [SOCIAL_NETWORK.POSITION] : position
                    })
                    .where({ [SOCIAL_NETWORK.ID] : id });

                if(response){
                    return true;
                }
            } catch (error) {}
        }
        return false;
    }
}

module.exports = SocialNetwork;