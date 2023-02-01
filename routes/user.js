const express = require('express')
const router = express.Router()


module.exports = (app) => {

    app.use('/users', router);

    //returns user based on its id
    router.get('/:userId', async (req, res, next) => {

    });

    //updates user based on its id
    router.put('/:userId', async (req, res, next) => {

    });

}