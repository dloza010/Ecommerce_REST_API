const db = require('../db');
const pgp = require('pg-promise')({capSQL: true});
const moment = require('moment');

module.exports = class cartModel{

    constructor(data = {}){
        this.modified = moment.utc().toISOString();
        this.created = data.created || moment.utc().toISOString();
        this.converted = data.converted || false;
        // this.isActive = data.isActive || true;
        this.items = data.items || [];
    };

    /**
     * Creates a new cart for a user
     * @param  {Object}      data [User data]
     * @return {Object|null}      [Created user record]
     */
    async create(id) {
        
        try {
            
            const userid = id;
            const modified = this.modified;
            const created = this.created;
            const converted = this.converted;
            const data = {userid, modified, created, converted};

            // Generate SQL statement - using helper for dynamic parameter injection
            const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';
            // return statement;
            // Execute SQL statment
            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    };

    /**
     * Loads a cart by userID
     * @param {Object} id [User id]
     * @return {Object|null} [Record of cart]
     */

    static async findByUser(userId) {
        
        try{
            const id = userId;
            //Generate SQL statement
            const statement = `SELECT * FROM carts WHERE userid = $1`;
            const values = [id];

            //Execute SQL statement
            const results = await db.query(statement, values);

            if (results.rows?.length){
                return results.rows[0];
            }

            return null;

        }catch(err){
            throw new Error(err);
        }
    };

    /**
     * Loads a cart by cartId
     * @param {Object} cartId [cart id]
     * @return {Object|null}  [record of cart]
     */

    static async loadByCartId(cartId){

        try{

            //Generate SQL statement
            const statement = `SELECT * FROM cart WHERE id = $1`;
            const values = cartId;

            //Execute SQL statment
            const results = await db.query(statement, values);

            if (results.rows?.lenght){
                return results.rows[0];
            }

            return null;

        }catch(err){
            throw new Error(err);
        }
    };
}