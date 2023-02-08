const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

const UserServiceInstance = new UserService();

module.exports = (app) => {

  app.use('/users', router);

  router.get('/', async(req, res, next) =>{
    try{

      const users = await UserServiceInstance.list();
      res.status(200).send(users);

    }catch(err){
      next(err);
    }
  });

  router.get('/:userId', async (req, res, next) => {

    try {
      const {userId}  = req.params;
      
      const response = await UserServiceInstance.get(userId);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.put('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = req.body;
      
      const user = await UserServiceInstance.update({id: userId, ...data});
      res.status(200).json({
        user,
        status: "success",
        message: "User has been updated"
      });
      
    } catch(err) {
      next(err);
    }
  });

}