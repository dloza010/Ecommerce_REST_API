const express = require('express')
const router = express.Router()
const userService = require('../services/userService');

const userServiceInstance =  new userService();

module.exports = (app) => {

    app.use('/users', router);

    //returns user based on its id
    router.get('/:userId', async (req, res, next) => {
        
        try{

            const userId = req.params;

            const response = await userServiceInstance.get({id: userId});
            res.status(200).send(response);

        }catch(err){
            next(err);
        }
    });

    //updates user based on its id
    router.put('/:userId', async (req, res, next) => {

        try{

            const userId = req.params;
            const data = req.body;

            const response = await userServiceInstance.update({id: userId, ...data});
            res.status(200).send(response);

        }catch(err){
            next(err);
        }

    });

}