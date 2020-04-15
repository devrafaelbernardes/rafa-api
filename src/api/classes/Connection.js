class Connection{
    constructor(){
        this._connection = require('../../config/database');
    }

    get getConnection(){
        return () => this._connection;//this._connection;
    }
}
const instance = new Connection();
Object.freeze(instance);
module.exports = instance;