const multer = require('multer');
const graphqlHTTP = require('express-graphql');
const fs = require('fs');
const schema = require('../api/schema');
const { PATH_IMAGES } = require('../config/paths');
const path = require('path');
const multerConfig = require('../config/multer');
const MediaResolver = require('../api/classes/resolver/MediaResolver');
const routes = require('express').Router();

routes.post('/api', graphqlHTTP({
    schema: schema,
    //rootValue: resolvers,
    graphiql: false
}));

routes.get('/api', graphqlHTTP({
    schema: schema,
    //rootValue: resolvers,
    graphiql: true
}));

var upload = multer(multerConfig);

routes.get('/image/:name', function (req, res) {
    if (req.params && req.params.name) {
        var local_imagem = path.join(PATH_IMAGES, req.params.name);
        fs.readFile(local_imagem, function (err, content) {
            if (err) {
                res.end("No such image");
            } else {
                res.end(content);
            }
        });
    } else {
        res.end("No such image");
    }
});

routes.post('/media', upload.single('image'), async(req, res, next) => {
    //console.log(req.file, req.files, req.body);
    if (!req.file) {
        return res.status(404).json({ error: 'Not found' });
    }
    let response = false;
    let media = null;
    const classMediaResolver = new MediaResolver();
    
    if(req.body.token && req.body.link && req.file.key){
        let { token, link } = req.body;
        let { key /*, size, mimetype, location : url = ""*/ } = req.file;
        try {
            await classMediaResolver.addMedia(token, link, key)
                .then(r => {
                    if(r){
                        response = true;
                        media = r;
                    }
                });
        } catch (error) {}
    }
    return await res.json({ status : response, media : media });
})

module.exports = routes;