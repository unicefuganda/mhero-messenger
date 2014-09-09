var finalHandler = require('finalhandler'),http = require('http'),
serveStatic = require('serve-static'),
serve = serveStatic(__dirname + '/../static', {'index': ['landing_page.html', 'index.html']}),
fs = require('fs'),
path = require('path');

var RequestRouter = function(){
	var handleGet = function(req, res){
		var done = finalHandler(res, res);
		serve(req, res, done);
	};

	var handlePost = function(req, res){
		var formidable = require('formidable'),
			util = require('util'),
			form = new formidable.IncomingForm();
			form.uploadDir  = __dirname + '/../uploads/'

    form.parse(req, function(err, fields, files) {
      var oldPath = files.file.path,
      dir = path.dirname(oldPath)
      fs.rename(oldPath, path.join(dir, files.file.name),  function(err){
      	console.log(err)
      });

      res.writeHead(302, {
        	'content-type': 'text/html',
        	'Location': '/'
      });

      res.end();
    });
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