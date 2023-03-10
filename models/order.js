const db = require('../db')
const pgp = require('pg-promise')({capSQL: true})
const moment = require('moment');
const OrderItem = require('./orderItem');

module.exports = class orderModel{

    constructor(data = {}){
        this.created = data.created || moment.utc().toISOString();
        this.items = data.items || [];
        this.modified = moment.utc().toISOString();
        this.status = data.status || 'PENDING';
        this.total = data.total || 0;
        this.userid = data.userid || null;
    };

    /**
     * create new order record
     * @return {Object|null} [Created order record]
     */
    async create(){
        try{

            //use spread(...) syntax to get all of the class properties
            const {items, ...order} = this;

            //Generate SQL statement - using helper for dynamic parameter injection
            const statement = pgp.helpers.insert(order, null, 'orders') + 'RETURNING *';
            
            //Execute SQL statement
            const results = await db.query(statement);

            if(results.rows?.length){
                Object.assign(this, results.rows[0]);
                return results.rows[0]
            }

            return null;

        }catch(err){
        
            throw new Error(err)
        }
    }

    async addItems(items){
        this.items = items.map(item => new OrderItem(item));
    }

    /**
     * updates order record
     * @param {Object} id [user id]
     * @param {Object} data [order record to update]
     * @return {Object|null} [updated order record]
     */
    async update(data){
        try {

            // Generate SQL statement - using helper for dynamic parameter injection
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id: this.id });
            const statement = pgp.helpers.update(data, null, 'orders') + condition;
        
            // Execute SQL statment
            const result = await db.query(statement);
      
            if (result.rows?.length) {
                Object.assign(this, result.rows[0]);
                return this;
            }
            return null;
      
          } catch(err) {
            throw new Error(err);
          }

    }

    /**
     * Returns orders based on user
     * @param {String} id [userid]
     * @returns {Object|null} [Order records]
     */
    static async getByUserId(id){

        try{

            //Generate SQL statement
            const statement = `SELECT * FROM orders WHERE userid = $1`;
            const values = [id];

            //Execute SQL statement
            const results = await db.query(statement, values);
            if(results.rows?.lenght){
                return results.rows
            }
            return 'None found';
            return null

        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Returns orders based on orderId
     * @param {String} id [orderid]
     * @returns {Object|null} [Order record]
     */
    static async getByOrderId(orderId){

        try{

            //Generate SQL statement
            const statement = `SELECT * FROM orders WHERE orderid = $1`;
            const values = orderId;

            //Execute SQL statement
            const results = await db.query(statement, values);
            if(results.rows?.lenght){
                return results.rows
            }

            return null

        }catch(err){
            throw new Error(err)
        }
    }
}
