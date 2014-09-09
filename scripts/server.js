#!/usr/bin/env node

var finalHandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

var rootDir = __dirname + '/..';

var serve = serveStatic(rootDir + '/static', {'index': ['landing_page.html', 'index.html']});

var server = http.createServer(function(req, res){
    var done = finalHandler(res, res);
    serve(req, res, done);
});

server.listen(8000);
