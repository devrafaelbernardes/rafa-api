const {
    getBolsas,
    getMidias,
    getSistema,
    validateLogin
} = require('./functions');
module.exports = {
    Query : {
        sistema : async() => {
            return await getSistema();
        },
        bolsas : async() => {
            return await getBolsas();
        },
        midias : async() => {
            return await getMidias();
        }
    },
    Mutation : {
        validaLogin : async(_, { input }) => {
            if(input){
                try {
                    var { email, senha } = input;
                    return await validateLogin(email, senha);
                } catch (error) {}
            }
            return null;
        }
    }
}