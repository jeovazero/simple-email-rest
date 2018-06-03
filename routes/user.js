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
        .catch(e => {
            console.log(e);
            // Mensagem provisoria
            res.send({
                success: false,
                code: 490,
                message: "Usuario ja registrado"
            })
        })
        return next()
    })
    
    server.post("/login", function(req, res, next){
        let email = req.body.email,
            password = req.body.password

        User.findOne({email: email})
        .then( user => {
            if( user && user.verifyPasswd(password) ){
                res.send({
                    success: true,
                    code: 200,
                    message: "Logado, \o/"
                })
            }else{
                res.send({
                    success: false,
                    code: 491,
                    message: "Usuario e/ou senha errados"
                })
            }
        })
        .catch( e => {
            console.log(e);
            res.send({
                success: false,
                code: 590,
                message: "Erro no Database, talvez"
            })
        })
        return next()
    })
};