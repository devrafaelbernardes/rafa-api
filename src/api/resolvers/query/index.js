const MediaResolver = require('../../classes/resolver/MediaResolver');
const BagResolver = require('../../classes/resolver/BagResolver');
const UserResolver = require('../../classes/resolver/UserResolver');
const SocialNetworkResolver = require('../../classes/resolver/SocialNetworkResolver');

module.exports = {
    user : (_, { token }) => {
        try {
            const classUserResolver = new UserResolver();
            return classUserResolver.user(token);
        } catch (error) {}
        return null;
    },
    bag : async(_, { code }) => {
        try {
            const classBagResolver = new BagResolver();
            return classBagResolver.find({ code });
        } catch (error) {}
        return null;
    },
    bags : async() => {
        try {
            const classBagResolver = new BagResolver();
            return classBagResolver.findAll();
        } catch (error) {}
        return null;
    },
    media : async(_, { code }) => {
        try {
            const classMediaResolver = new MediaResolver();
            return classMediaResolver.find({ code });
        } catch (error) {}
        return null;
    },
    medias : async() => {
        try {
            const classMediaResolver = new MediaResolver();
            return classMediaResolver.findAll();
        } catch (error) {}
        return null;
    },
    social_network : async(_, { code }) => {
        try {
            const classSocialNetworkResolver = new SocialNetworkResolver();
            return classSocialNetworkResolver.find({ code });
        } catch (error) {}
        return null;
    },
    social_networks : async() => {
        try {
            const classSocialNetworkResolver = new SocialNetworkResolver();
            return classSocialNetworkResolver.findAll();
        } catch (error) {}
        return null;
    },
}