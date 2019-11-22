const Media = require('../Media');
const User = require('../User');
const Image = require('../Image');
const { MEDIA, USER } = require('../../elementsSchema');

class MediaResolver{
    constructor(){
        this.classMedia = new Media();
        this.classUser = new User();
        this.classImage = new Image();
    }

    async addMedia(token, link, location_image){
        if(token && link && location_image){
            try {
                const user = await this.classUser.findByToken(token);
                if(user){
                    const image_id = await this.classImage.add(location_image);
                    if(image_id){
                        const media_id = await this.classMedia.add(link, image_id);
                        if(media_id){
                            return this.classMedia.findById(media_id);
                        }
                    }
                }
            } catch (error) {}
        }
        return null;
    }

    async findAll(){
        try {
            return this.classMedia.findAll();
        } catch (error) {}
        return null;
    }
}

module.exports = MediaResolver;