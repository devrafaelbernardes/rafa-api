const path = require('path');
const { isDevelopment } = require('../config/server');
const PATH_IMAGES = isDevelopment ? path.join(__dirname, '..', '..', '..', 'images_api') : "/var/www/images_api/";

module.exports = {
    PATH_IMAGES : PATH_IMAGES,
    PATH_BAG_IMAGES : path.join(PATH_IMAGES, 'bags'),
    PATH_MEDIA_IMAGES : path.join(PATH_IMAGES, 'medias'),
    PATH_OTHERS_IMAGES : path.join(PATH_IMAGES, 'others')
}