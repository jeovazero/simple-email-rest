const restify = require('restify')
const server = restify.createServer()
require('./routes/email')(server);
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT
const SECRET = process.env.SECRET

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.use(function(req, res, next){
    const token = req.header('auth');
    console.log(token)
    jwt.verify(token, new Buffer.from(SECRET), function(err, data){
        if(err){
            req.user = null;
            console.log("NO AUTH ", err)
        }else{
            req.user = data.user
            console.log("AUTH ", data.user)
        }
    });
    next()
})

server.get("/", function(req, res, next){
    res.send("Wow! \o/")
    return next()
})

server.listen(PORT, function(){
    console.log("Pode cunfiar tiu aqui noiz faiz servidor")
})