const Bag = require('../Bag');
const User = require('../User');
const BagImage = require('../BagImage');
const Image = require('../Image');
const Upload = require('../Upload');
const { BAG } = require('../../elementsSchema');
const { cleanValue, cleanValueInt, cleanValueFloat } = require('../../functionValidate');

class BagResolver{
    constructor(){
        this.classBag = new Bag();
        this.classUser = new User();
        this.classBagImage = new BagImage();
        this.classImage = new Image();
        this.classUpload = new Upload();
    }

    async findAll(){
        try {
            return this.classBag.findAll();
        } catch (error) {}
        return null;
    }

    async find({ code }){
        try {
            return this.classBag.findByCode(code);
        } catch (error) {}
        return null;
    }

    async addBag({ token, name, total, discount, deposit, installments, installments_price, link, first_image, second_image }){
        if(token && name && first_image){
            try {
                let user = await this.classUser.findByToken(token);
                
                if(user){
                    name = await cleanValue(name);
                    link = await cleanValue(link);
                    total = await cleanValueFloat(total);
                    discount = await cleanValueFloat(discount);
                    deposit = await cleanValueFloat(deposit);
                    installments = await cleanValueFloat(installments);
                    installments_price = await cleanValueFloat(installments_price);
                    
                    let bag_id = await this.classBag.add({ name, total, discount, deposit, installments, installments_price, link });
                    if(bag_id){
                        let upload_first_image = await this.classUpload.uploadBagImage(first_image);
                        if(upload_first_image){
                            let id_first_image = await this.classImage.add(upload_first_image.filename);
                            if(id_first_image){
                                this.classBagImage.add({ bag_id, image_id : id_first_image });
                            }
                            if(second_image){
                                let upload_second_image = await this.classUpload.uploadBagImage(second_image);
                                let id_second_image = await this.classImage.add(upload_second_image.filename);
                                if(id_second_image){
                                    this.classBagImage.add({ bag_id, image_id : id_second_image });
                                }
                            }
                            return true;
                        }
                    }
                }
            } catch (error) {}
        }
        return false;
    }

    async editBag({ token, code, name, total, discount, deposit, installments, installments_price, link }){
        if(token && name){
            try {
                let user = await this.classUser.findByToken(token);
                if(user){
                    name = await cleanValue(name);
                    link = await cleanValue(link);
                    total = await cleanValueFloat(total);
                    discount = await cleanValueFloat(discount);
                    deposit = await cleanValueFloat(deposit);
                    installments = await cleanValueFloat(installments);
                    installments_price = await cleanValueFloat(installments_price);
                    let bag = await this.classBag.findByCode(code);
                    if(bag){
                        return await this.classBag.update({ id : bag[BAG.ID], name, total, discount, deposit, installments, installments_price, link });
                    }
                }
            } catch (error) {}
        }
        return false;
    }

    async remove({ token, code }){
        if(token && code){
            try {
                let user = await this.classUser.findByToken(token);
                if(user){
                    let bag = await this.classBag.findByCode(code);
                    if(bag){
                        return this.classBag.remove(bag[BAG.ID]);
                    }
                }
            } catch (error) {}
        }
        return false;
    }

    async updatePositionBags(token, bags){
        if(token && bags && bags.length > 0){
            try {
                let user = await this.classUser.findByToken(token);
                if(user){
                    for(let key in bags){
                        let element = bags[key];
                        let code = await cleanValue(element.code);
                        let position = await cleanValueInt(element.pos);
                        
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