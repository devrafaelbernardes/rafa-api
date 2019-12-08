const graphqlHTTP = require('express-graphql');
const { apolloUploadExpress } = require('apollo-upload-server');
const schema = require('../api/schema');
const { isDevelopment } = require('../config/server');
const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('API');
});

routes.post(
    '/api', 
    apolloUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphqlHTTP({
        schema: schema,
        graphiql: false
    })
);
if(isDevelopment){
    routes.get('/api', graphqlHTTP({
        schema: schema,
        graphiql: true
    }));
}

module.exports = routes;