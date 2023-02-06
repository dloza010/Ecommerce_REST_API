const createError = require('http-errors')
const productModel = require('../models/product')
const productModelInstance = new productModel()

module.exports = class productService{

    async list(options){

        try{

            //get all products from product table (catalog)
            const products = await productModelInstance.getProducts(options);
            return products;
        }catch(err){
            throw new Error(err)
        }

    }

    async get(id){


        try{

            //get product based on product ID
            const product = await productModelInstance.getById(id)
            
            if(!product){
                return createError(404, 'Product not found')
            }
            return product;

        }catch(err){
            throw err;
        }
    }
}