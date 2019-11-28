const Bag = require('../Bag');
const User = require('../User');
const { BAG } = require('../../elementsSchema');
const { cleanValue, cleanValueInt } = require('../../functionValidate');

class BagResolver{
    constructor(){
        this.classBag = new Bag();
        this.classUser = new User();
    }

    async findAll(){
        try {
            return this.classBag.findAll();
        } catch (error) {}
        return null;
    }

    async updatePositionBags(token, bags){
        if(token && bags && bags.length > 0){
            try {
                let user = await this.classUser.findByToken(token);
                if(user){
                    for(let key in bags){
                        let element = bags[key];
                        let code = cleanValue(element.code);
                        let position = cleanValueInt(element.pos);
                        
                        if(code && position >= 0){
                            let bag = await this.classBag.findByCode(code);
                            let response = await this.classBag.updatePosition(bag[BAG.ID], position); 
                            if(!response){
                                return false;
                            }
                        }else{
                            return false;
                        }
                    }
                    return true;
                }
            } catch (error) {}
        }
        return null;
    }
}

module.exports = BagResolver;