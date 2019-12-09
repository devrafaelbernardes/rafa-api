const graphqlHTTP = require('express-graphql');
const { apolloUploadExpress } = require('apollo-upload-server');
const schema = require('../api/schema');
const { isDevelopment } = require('../config/server');
const routes = require('express').Router();
const BASE_ROUTE = !isDevelopment ? '/api/' : "/"; //TEMPORÁRIO

routes.get(BASE_ROUTE, (req, res) => {
    res.send('API');
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