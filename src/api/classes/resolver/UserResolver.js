const User = require('../User');
const TokenAccess = require('../TokenAccess');
const { USER } = require('../../elementsSchema');

class UserResolver{
    constructor(){
        this.classUser = new User();
        this.classTokenAccess = new TokenAccess();
    }

    async login(login, password){
        try {
            const user = await this.classUser.login(login, password);
            if(user){
                const token = await this.classTokenAccess.add(user[USER.ID]);
                if(token){
                    return { token, user };
                }
            }
        } catch (error) {}
        return null;
    }
}

module.exports = UserResolver;