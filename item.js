// class for item in a shopping cart
const items = require('./db');

class Item {
    constructor(name, price){
        this.name = name;
        this.price = price;

        items.push(this);
    }


    static findAll(){
        return items;
    }


    static patch(name, data){
        const item = Item.find(name);
        if(!item){
            throw {message: "Resource not found", status:404}
        }
        item.name = data.name;
        item.price = data.price;

        return item;
    }


    static delete(name){
        const idx = items.findIndex(i => i.name === name);
        if(idx === -1){
            throw {message: "Resource not found", status: 404};
        }
        items.splice(idx,1);
    }


    static find(name){
        const item = items.find(i => i.name === name);
        if(!item){
            throw {message: "Resource not found", status: 404};
        }
        return item;
    }
}

module.exports = Item;