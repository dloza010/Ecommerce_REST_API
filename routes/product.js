const express = require('express')
const router = express.Router()
const productService = require('../services/productService')

const productServiceInstance = new productService()

module.exports = (app, passport) => {

    app.use('/product', router);

    //return list of all products
    app.get('/', async (req, res, next) => {

        try{
            const products = await productServiceInstance.list();
            res.status(200).send(products);

        }catch(err){
            next(err)
        }
    });

    //returns product based on its id
    app.get('/:productId', async (req, res, next) => {
        const id = req.params;

        try{

            const product = await productServiceInstance.get(id);
            res.status(200).send(product)

        }catch(err){
            throw new Error(err)
        }
    })
}