const express = require('express')
const router = express.Router()

const authService = require('../services/authService')
const authServiceInstance = new authService();

module.exports = (app, passport) => {

    app.use('/auth', router)

    router.post('/register', async(req, res, next) => {
        try{
            
            const data = req.body;
            
            const response = await authServiceInstance.create(data);
            res.status(200).send(response)

        }catch(err){
            throw new Error(err)
        }
    })

    router.post('/login', passport.authenticate('local'), async (req, res, next) => {
        try{

            const {username, password} = req.body;

            const response = await authServiceInstance.login(username, password);
            res.status(200).send(response)

        }catch(err){
            throw new Error(err)
        }
    })
    
}