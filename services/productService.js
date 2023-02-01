const createError = require('http-errors')
const productModel = require('../models/product')

const productModelInstance = new productModel()

module.exports = class productService{

    async list(){

        try{
            const products = productModelInstance.getProducts();
            return products;
        }catch(err){
            throw new Error(err)
        }

    }

    async get(id){

        const id = id;

        try{

            const product = productModelInstance.getById(id)
            
            if(!product){
                return createError(404, 'Product not found')
            }
            return product;

        }catch(err){
            throw new Error(err);
        }
    }
}