const mongoose = require('mongoose')
const User = require('../models/user')

const MONGO_URL = process.env.MONGO_URL
const SECRET = process.env.SECRET

mongoose.connect(MONGO_URL)

module.exports = function(server){
    server.post("/register", function(req, res, next){
        
        let name = req.body.name,
            password = req.body.password,
            email = req.body.email

        let user = new User({name, password, email})
        
        user.save()
        .then(() => {
            res.send({
                success: true,
                code: 200,
                message: "Usuario registrado"
            })
        })
        .catch(() => {
            // Mensagem provisoria
            res.send({
                success: false,
                code: 499,
                message: "Usuario ja registrado"
            })
        })
        return next()
    })
    
    server.post("/login", function(req, res, next){
        res.send('login')
        return next()
    })
};