const UserResolver = require('../../classes/resolver/UserResolver');
const classUserResolver = new UserResolver();

module.exports = {
    loginValidate : async(_, { input }) => {
        if(input){
            try {
                var { login, password } = input;
                return await classUserResolver.login(login, password);
            } catch (error) {}
        }
        return null;
    }
}