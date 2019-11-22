const MediaResolver = require('../../classes/resolver/MediaResolver');
const BagResolver = require('../../classes/resolver/BagResolver');

module.exports = {
    bags : async() => {
        try {
            const classBagResolver = new BagResolver();
            return classBagResolver.findAll();
        } catch (error) {}
        return null;
    },
    medias : async() => {
        try {
            const classMediaResolver = new MediaResolver();
            return classMediaResolver.findAll();
        } catch (error) {}
        return null;
    }
}