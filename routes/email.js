const mongoose = require('mongoose')
const User = require('../models/user')
const argon2 = require('argon2')

const MONGO_URL = process.env.MONGO_URL
const SECRET = process.env.SECRET

mongoose.connect(MONGO_URL)

function getBox(req, res, typebox){
    res.send({box: []})
}

module.exports = function(server){
    server.post("/register", function(req, res, next){  
        argon2.hash(req.body.password)
        .then( hash => {
            let name = req.body.name,
                password = hash,
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

    server.get("/email/inbox", function(req, res, next){
        if(req.authenticated == false){
            res.send({
                success: false,
                code: 492,
                message: "Usuario nao autenticado"
            })
        }else{
            getBox(req, res, "inbox");
        }
        return next()
    })

    server.get("/email/outbox", function(req, res, next){
        if(req.authenticated == false){
            res.send({
                success: false,
                code: 492,
                message: "Usuario nao autenticado"
            })
        }else{
            getBox(req, res, "outbox");
        }
        return next()
    })

    server.put("/email/send", function(req, res, next){
        if(req.authenticated == false){
            res.send({
                success: false,
                code: 492,
                message: "Usuario nao autenticado"
            })
        }else{
            res.send({
                message: "pow"
            })
        }
        return next()
    })
};