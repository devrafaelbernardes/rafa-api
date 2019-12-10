const express = require('express');
const minify = require('express-minify');
const compression = require('compression');
const routes = require('./routes/routes');
const { BASE_ROUTE } = require('./config/server');
const { PATH_BAG_IMAGES, PATH_MEDIA_IMAGES, PATH_OTHERS_IMAGES } = require('./config/paths');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
console.log(BASE_ROUTE+'image/bag/', PATH_BAG_IMAGES);

app.use(BASE_ROUTE+'image/bag/', express.static(PATH_BAG_IMAGES));
app.use(BASE_ROUTE+'image/media/', express.static(PATH_MEDIA_IMAGES));
app.use(BASE_ROUTE+'image/others/', express.static(PATH_OTHERS_IMAGES));
app.use(routes);
app.use(compression());
app.use(minify());
app.use(express.json());

module.exports = app;