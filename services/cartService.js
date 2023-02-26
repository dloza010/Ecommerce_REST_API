const createError = require('http-errors')
const cartModel = require('../models/cart')
const cartItemModel = require('../models/cartItem')
const orderModel = require('../models/order')
const orderItemModel = require('../models/orderItem')
const order = require('../routes/order')


module.exports = class cartService{

    async loadCart(userid){
        try{

            //load user cart
            const cart = await cartModel.findByUser(userid);
            //load cart items and add them to cart
            const items = await cartItemModel.find(cart.id);
            
            cart.items = items;
            return cart;

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
            throw err;
        }
    }

    async deleteItem(cartItemId){
        try{
            
            //Remove cartItem line by line ID
            const response = await cartItemModel.delete(cartItemId);
            return response;

        }catch(err){
            throw err;
        }
    }

    async checkout(userid, data){
        try{
            const {cartid} = data;
            const cartItems = await cartItemModel.find(cartid);
            
            const total = cartItems.reduce((total, item) =>{
                return total += Number(item.price);
            }, 0);

            const Order = new orderModel({total, userid, status: 'PENDING'});
            Order.addItems(cartItems);
            await Order.create();
            await Order.update({status: 'COMPLETE'});
            return Order;


        }catch(err){
            throw err;
        }
    }
}