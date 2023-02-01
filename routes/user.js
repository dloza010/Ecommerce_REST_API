const express = require('express')
const router = express.Router()


module.exports = (app) => {

    app.use('/users', router);

    router.get('/:userId', async(req, res, next) => {

        try{

        }catch(err){
            throw new Error(err)
        }
    })

}