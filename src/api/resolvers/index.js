const Mutation = require('./mutation');
const Query = require('./query');
const { GraphQLUpload } = require('apollo-upload-server');

module.exports = {
    Query : Query,
    Mutation : Mutation,
    Upload: GraphQLUpload
}