const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs');

module.exports = makeExecutableSchema({ 
    typeDefs, 
    resolvers 
});