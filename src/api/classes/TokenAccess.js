const Controller = require('./Controller');
const { TOKEN_ACCESS } = require('../elementsSchema');
const { encryptToken } = require('../encryptFunctions');

class TokenAccess extends Controller{
    constructor(){
        super();
    }

    async add(user_id){
        if(user_id){
            try {
                let token = await encryptToken(user_id);
                let response = await this.getDb.from(TOKEN_ACCESS.TABLE_NAME)
                    .insert({ 
                        [TOKEN_ACCESS.TOKEN] : token, 
                        [TOKEN_ACCESS.USER] : user_id
                    });
                if(response && response[0]){
                    return response[0];
                }
            } catch (error) {}
        }
        return null;
    }

    async find(column, value){
        if(column && value){
            try {
                const token_access = await this.getDb.from(TOKEN_ACCESS.TABLE_NAME)
                    .where({ [column] : value })
                    .first();

                if(token_access){
                    return {
                        ...token_access,
                    };
                }
            } catch (error) {}
        }
        return null;
    }

    findById(data){
        return this.find(TOKEN_ACCESS.ID, data);
    }

    findByToken(data){
        return this.find(TOKEN_ACCESS.TOKEN, data);
    }
}

module.exports = TokenAccess;