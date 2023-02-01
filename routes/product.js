const express = require('express')
const router = express.Router()

module.exports = (app, passport) => {

    app.use('/product', router);

    //return list of all products
    app.get('/', async (req, res, next) => {

    });

    //returns product based on its id
    app.get('/:productId', async (req, res, next) => {

    })
}