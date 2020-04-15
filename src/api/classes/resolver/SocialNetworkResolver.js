const SocialNetwork = require('../SocialNetwork');
const User = require('../User');
const Image = require('../Image');
const Upload = require('../Upload');
const { SOCIAL_NETWORK } = require('../../elementsSchema');
const { cleanValue, cleanValueInt } = require('../../functionValidate');

class SocialNetworkResolver{
    constructor(){
        this.classSocialNetwork = new SocialNetwork();
        this.classUser = new User();
        this.classImage = new Image();
        this.classUpload = new Upload();
    }

    async add({ token, link, image }){
        if(token && link && image){
            try {
                const user = await this.classUser.findByToken(token);
                if(user){
                    const objImage = await this.classUpload.uploadSocialNetworkImage(image);
                    if(objImage){
                        const image_id = await this.classImage.add(objImage.filename);
                        if(image_id){
                            const social_network_id = await this.classSocialNetwork.add(link, image_id);
                            if(social_network_id){
                                return true;
                            }
                        }
                    }
                }
            } catch (error) {}
        }
        return false;
    }

    async updatePositionSocialNetworks(token, social_networks){
        if(token && social_networks && social_networks.length > 0){
            try {
                let user = await this.classUser.findByToken(token);
                if(user){
                    for(let key in social_networks){
                        let element = social_networks[key];
                        let code = await cleanValue(element.code);
                        let position = await cleanValueInt(element.pos);
                        
                        if(code && position >= 0){
                            let social_network = await this.classSocialNetwork.findByCode(code);
                            let response = await this.classSocialNetwork.updatePosition(social_network[SOCIAL_NETWORK.ID], position); 
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

    async remove({ token, code }){
        if(token && code){
            try {
                let user = await this.classUser.findByToken(token);
                if(user){
                    let social_network = await this.classSocialNetwork.findByCode(code);
                    if(social_network){
                        return this.classSocialNetwork.remove(social_network[SOCIAL_NETWORK.ID]);
                    }
                }
            } catch (error) {}
        }
        return false;
    }

    async findAll(){
        try {
            return this.classSocialNetwork.findAll();
        } catch (error) {}
        return null;
    }

    async find({ code }){
        try {
            return this.classSocialNetwork.findByCode(code);
        } catch (error) {}
        return null;
    }
}

module.exports = SocialNetworkResolver;