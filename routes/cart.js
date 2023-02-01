const express = require('express');
const router = express.Router();


module.exports = (app, passport) =>{

    app.use('/carts', router);

    // returns cart of current user
    router.get('/mine', async (req, res, next) => {

    });

    //creates a cart for current user
    router.post('/mine', async (req, res, next) => {

    });

    //creates new items for current user's cart
    router.post('/mine/items', async (req, res, next) => {

    });

    //updates items in current user's cart
    router.put('/mine/items/:cartItemId', async (req, res, next) => {

    })

    //deletes items in current user's cart
    router.delete('/mine/items/:cartItemId', async (req, res, next) => {
        
    })
}