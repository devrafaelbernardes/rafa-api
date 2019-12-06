const Controller = require('./Controller');
const BagImage = require('./BagImage');
const { BAG } = require('../elementsSchema');
const { encryptCode } = require('../encryptFunctions');

class Bag extends Controller{
    constructor(){
        super();

        this.classBagImage = new BagImage();
    }

    async add({ name, total, discount, deposit, installments, installments_price, link }){
        if(name){
            try {
                let code = await encryptCode(name);
                let position = await this.maxPosition();
                const DEFAULT = 'DEFAULT';
                let response = await this.getDb.from(BAG.TABLE_NAME)
                    .insert({
                        [BAG.CODE] : code,
                        [BAG.NAME] : name,
                        [BAG.DEPOSIT] : deposit || this.getDb.raw(DEFAULT),
                        [BAG.TOTAL_PRICE] : total || this.getDb.raw(DEFAULT),
                        [BAG.DISCOUNT_PRICE] : discount || this.getDb.raw(DEFAULT),
                        [BAG.INSTALLMENTS] : installments || this.getDb.raw(DEFAULT),
                        [BAG.INSTALLMENTS_PRICE] : installments_price || this.getDb.raw(DEFAULT),
                        [BAG.LINK] : link || this.getDb.raw(DEFAULT),
                        [BAG.POSITION] : position + 1,
                    });
                if(response && response[0]){
                    return response[0];
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        return null;
    }

    async find(column, value){
        if(column && value){
            try {
                const bag = await this.getDb.from(BAG.TABLE_NAME)
                    .where({
                        [column] : value,
                        [BAG.ACTIVE] : true
                    })
                    .first();

                if(bag){
                    let bag_id = bag[BAG.ID];
                    return {
                        ...bag,
                        price : bag ? (bag[BAG.DISCOUNT_PRICE] && bag[BAG.DISCOUNT_PRICE] < bag[BAG.TOTAL_PRICE] ? bag[BAG.DISCOUNT_PRICE] : bag[BAG.TOTAL_PRICE]) : 0,
                        images : () => this.classBagImage.findByBagId(bag_id),
                        first_image : () => this.classBagImage.findFirstImageByBagId(bag_id),
                        second_image : () => this.classBagImage.findSecondImageByBagId(bag_id),
                    };
                }
            } catch (error) {}
        }
        return null;
    }

    findById(id){
        return this.find(BAG.ID, id);
    }
    findByCode(code){
        return this.find(BAG.CODE, code);
    }

    async findAll(){
        try{
            let bags = await this.getDb.from(BAG.TABLE_NAME)
                .select(BAG.ID)
                .where({ [BAG.ACTIVE] : true })
                .orderBy(BAG.POSITION, 'asc');
            if(bags && bags.length > 0){
                return bags.map(async(item) => {
                    let bag = await this.findById(item[BAG.ID]);
                    if(bag){
                        return bag;
                    }
                });
            }
        }catch(e){
        }
        return null;
    }

    async count(){
        try{
            let response = await this.getDb.from(BAG.TABLE_NAME)
                .where({ [BAG.ACTIVE] : true })
                .count({ count : BAG.ID })
                .first();
            if(response && response.count){
                return response.count;
            }
        } catch (error) {}
        return 0;
    }

    async updatePosition(id, position){
        if(id && position >= 0){
            try {
                const response = await this.getDb.from(BAG.TABLE_NAME)
                    .update({
                        [BAG.POSITION] : position
                    })
                    .where({ [BAG.ID] : id });

                if(response){
                    return true;
                }
            } catch (error) {}
        }
        return false;
    }

    async maxPosition(){
        try {
            let response = await this.getDb.from(BAG.TABLE_NAME)
                .max({ max : BAG.POSITION })
                .first();
            
            if(response && response.max){
                return response.max;
            }
        } catch (error) {}
        return 0;
    }
}

module.exports = Bag;