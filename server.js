var finalHandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

var serve = serveStatic('static', {'index': ['landing_page.html', 'index.html']});

var server = http.createServer(function(req, res){
    var done = finalHandler(res, res);
    serve(req, res, done);
});

server.listen(8000);
