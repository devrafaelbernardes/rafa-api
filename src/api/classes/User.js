const Controller = require('./Controller');
const TokenAccess = require('./TokenAccess');
const { USER, TOKEN_ACCESS } = require('../elementsSchema');
const { encryptPassword } = require('../encryptFunctions');

class User extends Controller{
    constructor(){
        super();

        this.classTokenUser = new TokenAccess();
    }

    async find(column, value){
        if(column && value){
            try {
                const user = await this.getDb.from(USER.TABLE_NAME)
                    .where({ 
                        [column] : value,
                        [USER.ACTIVE] : true,
                    })
                    .first();

                if(user){
                    return {
                        ...user,
                        fullName : user[USER.NAME] + " " + user[USER.LASTNAME]
                    };
                }
            } catch (error) {}
        }
        return null;
    }

    findById(id){
        return this.find(USER.ID, id);
    }

    async findByToken(token){
        if(token){
            try {
                let token_user = await this.classTokenUser.findByToken(token);
                if(token_user){
                    return this.findById(token_user[TOKEN_ACCESS.USER]);
                }
            } catch (error) {}
        }
        return null;
    }

    async login(login, password){
        if(login && password){
            try {
                const user = await this.getDb.from(USER.TABLE_NAME)
                    .where({ 
                        [USER.EMAIL] : login,
                        [USER.ACTIVE] : true,
                    })
                    .first();
                if(user){
                    password = await encryptPassword(password, user[USER.SALT_PASSWORD]);
                    if(password === user[USER.PASSWORD]){
                        return this.findById(user[USER.ID]);
                    }
                }
            } catch (error) {}
        }
        return null;
    }
}

module.exports = User;