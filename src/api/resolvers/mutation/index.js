const UserResolver = require('../../classes/resolver/UserResolver');
const BagResolver = require('../../classes/resolver/BagResolver');
const MediaResolver = require('../../classes/resolver/MediaResolver');
const Upload = require('../../classes/Upload');
const { storeFS } = require('../../../config/multer');

module.exports = {
    loginValidate : async(_, { input }) => {
        if(input){
            try {
                var { login, password } = input;
                const classUserResolver = new UserResolver();
                return await classUserResolver.login(login, password);
            } catch (error) {}
        }
        return null;
    },
    updatePositionBags : (_, { input }) => {
        if(input){
            try {
                let { token, bags } = input;
                const classBagResolver = new BagResolver();
                return classBagResolver.updatePositionBags(token, bags); 
            } catch (error) {}
        }
        return false;
    },
    updatePositionMedias : (_, { input }) => {
        if(input){
            try {
                let { token, medias } = input;
                const classMediaResolver = new MediaResolver();
                return classMediaResolver.updatePositionMedias(token, medias); 
            } catch (error) {}
        }
        return false;
    },
    addBag : async(_, { input, first_image, second_image }) => {
        if(input && first_image){
            try {
                let { token, name, total, discount, deposit, installments, installments_price, link } = input;
                const classBagResolver = new BagResolver();
                return classBagResolver.addBag({ token, name, total, discount, deposit, installments, installments_price, link, first_image, second_image });
            } catch (error) {}
        }
        return false;
    }
}