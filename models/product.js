const db = require('../db')
const pgb = require('pg-promise')({capSQL: true})

module.exports = class productModel{

    /**
     * List all product
     * @param {Object} options [Query options]
     * @return {Array}         [Array of products]
     */

     async getProducts(){

        try{

            //Generate SQL statement
        const statement =  `SELECT * FROM products`;
        const values = [];

        //Execute SQL statement
        const results = await db.query(statement);

        if (results.rows?.length){
            return results.rows;
        }

        return [];

        }catch(err){
            throw err;
        }
        
    }

    /**
     * List product by id
     * @param {Object}          id [Product id]
     * @return {Object|Null}       [Product record]
     */

    async getById(id){

        try{

            //Generate SQL statement
            const statement = `SELECT * FROM products
            WHERE productid = $1`
            const values = id;

            //Execute SQL statement
            const results = await db.query(statement, values);

            if(results.rows?.length){
                return results.rows[0];
            }

            return null;

        }catch(err){
            throw new Error(err);
        }
    }

}
    