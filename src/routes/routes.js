const graphqlHTTP = require('express-graphql');
const { apolloUploadExpress } = require('apollo-upload-server');
const schema = require('../api/schema');
const { isDevelopment, BASE_ROUTE } = require('../config/server');
const routes = require('express').Router();
const fs = require('fs');
const path = require('path');
const { PATH_BAG_IMAGES, PATH_MEDIA_IMAGES, PATH_OTHERS_IMAGES } = require('../config/paths');

const readImage = (directory, req, res) => {
    if (req.params && req.params.name) {
        var local_image = path.resolve(directory, req.params.name);
        fs.readFile(local_image, function (err, content) {
            if (err) {
                console.log(err);
                
                res.end("No such image");
            } else {
                res.end(content);
            }
        });
    } else {
        res.end("No such image");
    }
}

routes.get(BASE_ROUTE, (req, res) => {
    res.send('API');
});

routes.get(BASE_ROUTE+'image_test/:name', function (req, res) {
    readImage(PATH_BAG_IMAGES, req, res);
});

routes.post(
    BASE_ROUTE+'api', 
    apolloUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphqlHTTP({
        schema: schema,
        graphiql: false
    })
);
if(isDevelopment){
    routes.get(BASE_ROUTE+'api', graphqlHTTP({
        schema: schema,
        graphiql: true
    }));
}

module.exports = routes;