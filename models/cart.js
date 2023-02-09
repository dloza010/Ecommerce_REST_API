const db = require('../db')
const pgb = require('pg-promise')({capSQL: true})

module.exports = class cartModel{

    constructor(data = {}){
        this.created = data.created || moment.utc().toISOString();
        this.modified = moment.utc().toISOString();
        this.converted = data.converted || null;
        this.isActive = data.isActive || true;
        this.items = data.items || [];
    };

    /**
     * Creates a new cart for a user
     * @param  {Object}      data [User data]
     * @return {Object|null}      [Created user record]
     */
    async create(userId) {
        try {

            const data = { userId, ...this}

            // Generate SQL statement - using helper for dynamic parameter injection
            const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';
        
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

            //Generate SQL statement
            const statement = `SELECT * FROM cart WHERE user_id = $1`;
            const values = userId;

            //Execute SQL statement
            const results = await db.query(statement, values);

            if (results.rows?.length){
                return results.rows[0]
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