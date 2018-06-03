const restify = require('restify')
const server = restify.createServer()
require('./routes/user')(server);

PORT = process.env.PORT

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.use(function(req, res, next){
    // Middleware aquii
    next()
})

server.get("/", function(req, res, next){
    res.send("Wow! \o/")
    return next()
})

server.listen(PORT, function(){
    console.log("Pode cunfiar tiu aqui noiz faiz servidor")
})