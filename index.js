var restify = require('restify')
var server = restify.createServer()

PORT = process.env.PORT

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.use(function(req, res, next){
    // Middleware aquii
    next()
})

server.get("/", function(req, res, next){
    res.send("Wow! \\o/");
    return next()
})


server.get("/hello/:pow", function(req, res, next){
    res.send("Hey pow: " + req.params.pow)
    return next()
})

server.listen(PORT, function(){
    console.log("Pode tiu aqui noiz faiz servidor")
})