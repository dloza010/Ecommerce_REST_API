const express = require('express')
const router = express.Router();
const orderService = require('../services/orderService')
const orderServiceInstance = new orderService()

module.exports = (app, passport) => {

    app.use('/orders', router);


    //returns all orders made by current user
    router.get('/', async (req, res, next) => {
        try{

            const id = req.user;

            const response = await orderServiceInstance.list(id)
            res.status(200).send(response)

        }catch(err){
            throw new Error(err)
        }

    });

    //returns order based on its id 
    router.get('/:orderId', async (req, res, next) => {
        try{

            const orderId = req.params

            const response = await orderServiceInstance.getById(orderId)
            res.status(200).send(response)

        }catch(err){
            throw new Error(err)
        }

    })
}