const Controller = require('./Controller');
const BagImage = require('./BagImage');
const { BAG } = require('../elementsSchema');

class Bag extends Controller{
    constructor(){
        super();

        this.classBagImage = new BagImage();
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
            var response = [];
            if(bags && bags.length > 0){
                for(let key in bags){
                    let bag = await this.findById(bags[key][BAG.ID]);
                    if(bag){
                        response.push(bag);
                    }
                }
                if(response.length > 0){
                    return response;
                }
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
}

module.exports = Bag;