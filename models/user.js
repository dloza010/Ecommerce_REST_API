const db = require('../db')
const pgb = require('pg-promise')({capSQL: true})

module.exports = class userModel{

    /**
     * Creates a new user
     * @param {Object} data [user data]
     * @return {Object|Null} [created user record]
     */

     async create(data){

        try{

            //Generate SQL statement
            const statement = `INSERT INTO users (userid, username, password, address,
            email, name) VALUES($1, $2, $3, $4, $5, $6)`;
            
            const {userid, username, password, address, email, name} = data;
            const values = [userid, username, password, address, email, name];

            //Execute SQL statement
            const result = await db.query(statement, values);

            if (result.rows?.length){
                return result.rows[0];
            }

            return null;

        }catch(err){
            throw new Error(err);
        }
         
    }

    /**
     * Updates the record of an user
     * @param {Object} data [user data]
     * @return {Object|Null} [updated user record]
     */

    async update(data){

        try{

            //Generate SQL statement
        const statement = `UPDATE users SET password = $1, address = $2,
        email = $3, name = $4 WHERE id = $6`;

        const {password, address, email, name} = data;
        const values = [password, address, email, name];

        //Execute SQL statement
        const results = await db.query(statement, values);
        if(results.rows?.length){
            return results.rows[0]
        }

        return null;

        }catch(err){
            throw new Error(err);
        }
        
    }

    /**
     * Finds a user record by ID
     * @param {String} id [user id]
     * @return {Object|Null} [user record]
     */

    async findOneById(id){

        try{

            //Generate SQL statement
            const statement = `SELECT userid, name, email FROM users WHERE id = $1`;
            const values = [id];
            
            //Execute SQL statement
            const result = await db.query(statement, values);
            if(result.rows.length){
                return result.rows[0]
            }

            return null;

        }catch(err){
            throw new Error(err);
        }
             
    }

    /**
     * Finds a user record by email
     * @param {String} email [user email]
     * @return {Object|Null} [user record]
     */

     async findOneByEmail(email){

        try{

            //Generate SQL statement
            const statement = `SELECT * FROM users WHERE email = $1`;
            const values = [email];

            //Execute SQL statement
            const result = await db.query(statement, values);
            if(result.rows.length){
                return result.rows[0]
            }

            return null;
            
        }catch(err){
            throw new Error(err);
        }
        
    }

    /**
     * Finds a user record by username
     * @param {String} username [username]
     * @return {Object|Null} [user record]
     */

     async findOneByUsername(username){

        try{

            //Generate SQL statement
            const statement = `SELECT * FROM users WHERE username = $1`;
            const values = [username];

            //Execute SQL statement
            const result = await db.query(statement, values);
            if(result.rows.length){
                return result.rows[0]
            }

            return null;
            
        }catch(err){
            throw new Error(err);
        }
        
        
    }


}
