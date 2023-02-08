const express = require('express');
const router = express.Router();
const ProductService = require('../services/productService');

const productServiceInstance = new ProductService()

module.exports = (app,passport) => {

    app.use('/products', router);

    router.get('/', async(req, res, next) => {
        try{

            const products = await productServiceInstance.list();
            res.status(200).send(products);

        }catch(err){
            throw err;
        }
    });

    router.get('/:productid', async(req, res, next) => {
        try{
            const {productid} = req.params;
            const product = await productServiceInstance.get(productid);

            res.status(200).send(product);
        }catch(err){
            throw err;
        }
    })
}