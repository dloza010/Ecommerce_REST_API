const express = require('express')
const router = express.Router();

module.exports = (app, passport) => {

    app.use('/orders', router);


    //returns all orders made by current user
    router.get('/', async (req, res, next) => {

    });


    //returns order based on its id 
    router.get('/:orderId', async (req, res, next) => {

    })
}