const createError = require('http-errors')
const userModel = require('../models/user');
const userModelInstance =  new userModel();

module.exports = class userService{

    
    async get(data){

        const id = data;

        try{

            //check if user exists
            const user = userModelInstance.findOneById(id);

            //if user exits, return error
            if(!user){
                return createError(404, 'User record not found')
            }

            return user;

        }catch(err){
            throw new Error(err);
        }
    }

    async update(data){

        try{
            

            const user = await userModelInstance.update(data);
            
            //check if user wasnt found
            if(!user){
                return createError(404, 'User record not found');
            }

            return user;

        }catch(err){
            throw new Error(err);
        }
    }
    
}