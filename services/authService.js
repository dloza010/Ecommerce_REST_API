const createError = require('http-errors')
const userModel = require('../models/user')
const UserModelInstance = new userModel()

module.exports = class authService{

    async register(data){
        try{

            const {email} = data;

            //Check to see if user already exists
            const user = await UserModelInstance.findOneByEmail(email);
            
            //if user already in use, retur error
            if (user){
                return createError(409, 'Email already in use')
            }

            return await UserModelInstance.create(data);

        }catch(err){
            throw createError(500, err)
        }
    };

    async login(data){
        const {username, password} = data;
        try {
            // Check if user exists
            const user = await UserModelInstance.findOneByUsername(username);
      
            // If no user found, reject
            if (!user) {
              throw createError(401, 'Incorrect username');
            }
      
            // Check for matching passwords
            if (user.password !== password) {
              throw createError(401, 'Incorrect password');
            }
      
            return user;
      
        } catch(err) {
            throw createError(500, err);
        }

    };
}