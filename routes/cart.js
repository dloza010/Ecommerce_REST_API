const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService')
const cartServiceInstance = new cartService()

module.exports = (app, passport) =>{

    app.use('/carts', router);

    // returns cart of current user
    router.get('/mine', async (req, res, next) => {
        try{

            const id = req.user;

            const response = await cartServiceInstance.loadCart(id)
            res.status(200).send(response)

        }catch(err){
            throw new Error(err)
        }

    });

    //creates a cart for current user
    router.post('/mine', async (req, res, next) => {
        try{

            const id = req.user;

            const response = await cartServiceInstance.create(id)
            res.status(200).send()

        }catch(err){
            throw new Error(err)
        }
    });

    //adds new items for current user's cart
    router.post('/mine/items', async (req, res, next) => {
        try{

            const userid = req.user;
            const data = req.body;

            const response = await cartServiceInstance.addItem(userid, data)
            res.status(200).send(response)

        }catch(err){
            throw new Error(err)
        }
    });

    //updates items in current user's cart
    router.put('/mine/items/:cartItemId', async (req, res, next) => {
        try{

            const cartItemid = req.params;
            const data = req.body;

            const response = await cartServiceInstance.updateItem(cartItemid, data)
            res.status(200).send(response)

        }catch(err){
            throw new Error(err)
        }
    })

    //deletes items in current user's cart
    router.delete('/mine/items/:cartItemId', async (req, res, next) => {
        try{

            const cartItemId = req.user;
            
            const response = await cartServiceInstance.deleteItem(cartItemId)
            res.status(200).send(response)

        }catch(err){

        }
    })
}