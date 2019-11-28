const UserResolver = require('../../classes/resolver/UserResolver');
const BagResolver = require('../../classes/resolver/BagResolver');
const classUserResolver = new UserResolver();
const classBagResolver = new BagResolver();

module.exports = {
    loginValidate : async(_, { input }) => {
        if(input){
            try {
                var { login, password } = input;
                return await classUserResolver.login(login, password);
            } catch (error) {}
        }
        return null;
    },
    updatePositionBags : (_, { input }) => {
        if(input){
            try {
                let { token, bags } = input;
                return classBagResolver.updatePositionBags(token, bags); 
            } catch (error) {}
        }
        return false;
    }
}