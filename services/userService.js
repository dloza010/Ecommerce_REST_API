const createError = require('http-errors');
const UserModel = require('../models/user');
const user = require('../routes/user');
const UserModelInstance = new UserModel();

module.exports = class UserService {


  async list(){

    try{

      const users = await UserModelInstance.find();
      return users; 

    }catch(err) {
      throw err;
    }
  }

  async get(id) {

    try {
      // Check if user already exists
      const user = await UserModelInstance.findOneById(id);
      
      // If user doesn't exist, reject
      if (!user) {
        throw createError(404, 'User record not found');
      }

      return user;

    } catch(err) {
      throw err;
    }

  };

  async update(data) {

    try {
      //Update user based on new data
      const updatedUser = await UserModelInstance.update(data);
      
      return updatedUser;

    } catch(err) {
      throw err;
    }

  };

}