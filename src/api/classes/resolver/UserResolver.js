const User = require('../User');
const TokenAccess = require('../TokenAccess');
const { USER } = require('../../elementsSchema');

class UserResolver{
    constructor(){
        this.classUser = new User();
        this.classTokenAccess = new TokenAccess();
    }

    async user(token){
        try {
            return this.classUser.findByToken(token);
        } catch (error) {}
        return null;
    }

    async login(login, password){
        try {
            let user = await this.classUser.login(login, password);
            console.log("UserResolver");
            console.log(user);
            
            if(user){                
                let token_id = await this.classTokenAccess.add(user[USER.ID]);
                if(token_id){
                    let token = await this.classTokenAccess.findById(token_id);
                    return { token, user };
                }
            }
        } catch (error) {
            console.log("UserResolver");
            console.log(error);
        }
        return null;
    }
}

module.exports = UserResolver;