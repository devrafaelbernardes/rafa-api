const connection = require('./Connection');

class Controller {
    constructor(){
        this.db = connection.getConnection();
    }
    
    setValues(obj){
        for(let key in obj){
            this[key] = obj[key];
        }
    }

    get getDb(){
        return this.db;
    }
}

module.exports = Controller;