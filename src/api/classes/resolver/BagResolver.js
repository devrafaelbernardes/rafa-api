const Bag = require('../Bag');
const { BAG } = require('../../elementsSchema');

class BagResolver{
    constructor(){
        this.classBag = new Bag();
    }

    async findAll(){
        try {
            return this.classBag.findAll();
        } catch (error) {}
        return null;
    }
}

module.exports = BagResolver;