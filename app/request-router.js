var finalHandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var serve = serveStatic(__dirname + '/../static', {'index': ['landing_page.html', 'index.html']});

var RequestRouter = function(){
	var handleGet = function(req, res){
		var done = finalHandler(res, res);
		serve(req, res, done);
	};

	var handlePost = function(req, res){
		console.log(req.method)
	};

	var handleProhibitted = function(req, res){
		res.writeHead(403, {'Content-type': 'text/plain',});
		res.write('Request not permitted');
		res.end();
	};

	this.handle = function(req, res){
		if (req.method == 'GET'){
		    handleGet(req, res);
		}
		else if (req.method == 'POST')
		{
			handlePost(req, res);
		}else{
			handleProhibitted(req, res);
		}
	};
};

module.exports = RequestRouter;
