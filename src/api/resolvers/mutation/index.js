const UserResolver = require('../../classes/resolver/UserResolver');
const BagResolver = require('../../classes/resolver/BagResolver');
const MediaResolver = require('../../classes/resolver/MediaResolver');
const SocialNetworkResolver = require('../../classes/resolver/SocialNetworkResolver');
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
    updatePositionSocialNetworks : (_, { input }) => {
        if(input){
            try {
                let { token, social_networks } = input;
                const classSocialNetworkResolver = new SocialNetworkResolver();
                return classSocialNetworkResolver.updatePositionSocialNetworks(token, social_networks); 
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
    },
    editBag : async(_, { input }) => {
        if(input){
            try {
                let { token, code, name, total, discount, deposit, installments, installments_price, link } = input;
                const classBagResolver = new BagResolver();
                return classBagResolver.editBag({ token, code, name, total, discount, deposit, installments, installments_price, link });
            } catch (error) {}
        }
        return false;
    },
    addMedia : async(_, { input, image }) => {
        if(input && image){
            try {
                let { token, link } = input;
                const classMediaResolver = new MediaResolver();
                return classMediaResolver.addMedia({ token, link, image });
            } catch (error) {}
        }
        return false;
    },
    addSocialNetwork : async(_, { input, image }) => {
        if(input && image){
            try {
                let { token, link } = input;
                const classSocialNetworkResolver = new SocialNetworkResolver();
                return classSocialNetworkResolver.add({ token, link, image });
            } catch (error) {}
        }
        return false;
    },
    removeBag : async(_, { input }) => {
        if(input){
            try {
                let { token, code } = input;
                
                const classBagResolver = new BagResolver();
                return classBagResolver.remove({ token, code });
            } catch (error) {}
        }
        return false;
    },
    removeMedia : async(_, { input }) => {
        if(input){
            try {
                let { token, code } = input;
                const classMediaResolver = new MediaResolver();
                return classMediaResolver.remove({ token, code });
            } catch (error) {}
        }
        return false;
    },
    removeSocialNetwork : async(_, { input }) => {
        if(input){
            try {
                let { token, code } = input;
                const classSocialNetworkResolver = new SocialNetworkResolver();
                return classSocialNetworkResolver.remove({ token, code });
            } catch (error) {}
        }
        return false;
    }
}