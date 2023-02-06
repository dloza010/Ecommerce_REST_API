const createError = require('http-errors')
const orderModel = require('../models/order')


module.exports = class orderService{

    async create(userId){
        try{
            
            //Initiate new orderModel and create new order
            const Order = new orderModel()
            const order = await Order.create({userId, total})

            return order

        }catch(err){
            throw err
        }
    };
    
    async list(userId){
        try{

            //get orders by user ID
            const orders = await orderModel.getByUserId(userId)
            return orders

        }catch(err){
            throw err;
        }
    };

    async get(orderId){
        try{

            //get order by order ID
            const order = await orderModel.getByOrderId(orderId)
            return order

        }catch(err){
            throw err
        }
    };
}
