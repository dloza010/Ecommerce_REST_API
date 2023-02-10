const express = require('express');
const router = express.Router();

// Instantiate Services
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {

    app.use('/auth', router);

    router.get('/l', (req, res, next) => {
        res.status(200).send('User has been logged out.');
    });

    // Registration Endpoint
    router.post('/register', async (req, res, next) => {
  
        try {
            const data = req.body;
            // console.log(data);
            const response = await AuthServiceInstance.register(data);
            res.status(200).json({
                message: 'New user has been registered!',
                info: {
                    name: response.name,
                    address: response.address,
                    email: response.email
                }
            });
        } catch(err) {
        next(err);
        }
  
    });

    //Current user
    router.get('/', (req, res, next) => {
        const user = req.user ? req.user : 'No user logged on at the moment.';
        res.status(200).send(user);
    })
  
    // Login Endpoint
    router.post('/login', passport.authenticate('local'), async(req, res, next) =>{
        try{
            const account = await AuthServiceInstance.login(req.body);
            // console.log(account);
            res.status(200).json({
                message: `Logged on ${account.name}!`,
                info: {
                    address: account.address,
                    email: account.email
                }
            });
        }catch(err){
            throw err;
        }
    });

    //logout endpoint
    router.post('/logout', function(req, res, next) {
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/auth/l');
        });
    });

}