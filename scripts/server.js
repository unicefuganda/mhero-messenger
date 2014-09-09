#!/usr/bin/env node

var http = require('http');

var RequestRouter = require(__dirname + '/../app/request-router');
var router = new RequestRouter();

var server = http.createServer(function(req, res){
    router.handle(req, res);
});

server.listen(8000);
