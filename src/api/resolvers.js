const {
    getBolsas,
    getMidias
} = require('./functions');
module.exports = {
    Query : {
        bolsas : async() => {
            return await getBolsas();
        },
        midias : async() => {
            return await getMidias();
        }
    },
    Mutation : {
    }
}