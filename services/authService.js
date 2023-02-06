const createError = require('http-errors')
const userModel = require('../models/user')
const userModelInstance = new userModel()

module.exports = class authService{

    async create(data){
        try{

            const {email} = data;

            //Check to see if user already exists
            const user = await userModelInstance.findOneByEmail(email);
            
            //if user already in use, retur error
            if (user){
                throw createError(409, 'Email already in use')
            }

            return await userModelInstance.create(data);

        }catch(err){
            throw createError(500, err)
        }
    };

    async login(data){
        try{

            const {username, password} = data;

            //check to see if user exits
            const user = await userModelInstance.findOneByUsername(username);

            //if user not found return result
            if(!user){
                throw createError(401, 'Incorrect username or password')
            }

            //if passwords don't match return error
            if(user.password !== password){
                throw createError(401, 'Incorrect username or password')
            }

            return user;

        }catch(err){
            throw createError(500, err)
        }

    };
}