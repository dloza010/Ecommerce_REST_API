const createError = require('http-errors')
const cartModel = require('../models/cart')
const cartItemModel = require('../models/cartItem')
const orderModel = require('../models/order')
const orderItemModel = require('../models/orderItem')


module.exports = class cartService{

    async loadCart(userid){
        try{

            //load user cart
            const carts = await cartModel.findByUser(userid);
            //load cart items and add them to cart
            for(let i = 0; i < carts.length; i++){
                const item = await cartItemModel.find(carts[i].id);
                carts[i].items = item;
            };
            
            return carts;

        }catch(err){
            throw err
        }
    }

    async create(id){
        
        try{

            //initiate new cartModel and create new cart
            const cartModelInstance = new cartModel()
            const cart = await cartModelInstance.create(id);
            return cart;

        }catch(err){
            throw err 
        }
    }

    async addItem(userid, data){
        try{

            const cart = await cartModel.findByUser(userid);
            console.log(cart);
            const item = await cartItemModel.create({cartid: cart.id, ...data})
            
            return item;

        }catch(err){
            throw err
        }
    }

    async updateItem(cartItemId, data){
        try{

            //Update cartItem by line id
            const updatedItem = await cartItemModel.update(cartItemId, data)

            return updatedItem;

        }catch(err){

        }
    }

    async deleteItem(cartItemId){
        try{

            //Remove cartItem line by line ID
            const response = await cartItemModel.delete(cartItemId)

            return response

        }catch(err){
            throw err
        }
    }
}