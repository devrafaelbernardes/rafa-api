// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const PATH_IMAGES = path.join(__dirname, '..', '..', 'images_api');

module.exports = {
    PATH_IMAGES : process.env.PATH_IMAGES || PATH_IMAGES,
    PATH_BAG_IMAGES : path.join(PATH_IMAGES, 'bags'),
    PATH_MEDIA_IMAGES : path.join(PATH_IMAGES, 'medias'),
    PATH_OTHERS_IMAGES : path.join(PATH_IMAGES, 'others')
}