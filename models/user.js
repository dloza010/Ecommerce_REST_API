const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class UserModel {

    /**
     * 
     * @returns {Object}  [Array of users]
     */

    async find(){
        try{

            //Generate SQL statement
            const statement = `SELECT * FROM users`;
            const values = [];

            //Execute SQL statement
            const result = await db.query(statement, values);

            if(result.rows?.length){
                return result.rows;
            }

            return null;

        }catch(err){
            throw err;
        }
    };

    /**
     * Creates a new user record
     * @param  {Object}      data [User data]
     * @return {Object|null}      [Created user record]
     */
    async create(data) {
        try {

        // Generate SQL statement - using helper for dynamic parameter injection
        const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
    
        // Execute SQL statment
        const result = await db.query(statement);

        if (result.rows?.length) {
            return result.rows[0];
        }

        return null;

        } catch(err) {
        throw err;
        }
    };

    /**
     * Updates a user record
     * @param  {Object}      data [User data]
     * @return {Object|null}      [Updated user record]
     */
    async update(data) {
        
        try {

        const {id, ...params}  = data;

        // Generate SQL statement 
        const condition = pgp.as.format('WHERE userid = $1', id);
        const statement = pgp.helpers.update(params, null, 'users') + condition;
        
        // Execute SQL statment
        const result = await db.query(statement);

        if (result) {
            const updatedUser = this.findOneById(id);
            return updatedUser;
        }

        return null;

        } catch(err) {
        throw err;
        }
    };

    /**
     * Finds a user record by email
     * @param  {String}      email [Email address]
     * @return {Object|null}       [User record]
     */
    async findOneByEmail(email) {
        try {
    
        // Generate SQL statement
        const statement = `SELECT *
                            FROM users
                            WHERE email = $1`;
        const values = [email];
    
        // Execute SQL statment
        const result = await db.query(statement, values);

        if (result.rows?.length) {
            return result.rows[0]
        }
    
        return null;

        } catch(err) {
        throw err;
        }
    };

    /**
     * Finds a user record by ID
     * @param  {String}      id [User ID]
     * @return {Object|null}    [User Record]
     */
    async findOneById(id) {
        try {

        // Generate SQL statement
        const statement = `SELECT *
                            FROM users
                            WHERE userid = $1`;
        const values = [id];
    
        // Execute SQL statment
        const result = await db.query(statement, values);

        if (result.rows?.length) {
            return result.rows[0]
        }
    
        return null;

        } catch(err) {
        throw err;
        }
    };

    async findOneByUsername(username){
        
        try{

            //Generate SQL statement
            const statement = `SELECT * FROM users WHERE username = $1`;
            const values = [username];

            //Execute SQL statement
            const result = await db.query(statement, values);

            if(result.rows?.length){
                return result.rows[0]
            };

            return result;

        }catch(err){
            throw err
        }
    };
}