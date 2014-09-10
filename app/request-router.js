var finalHandler = require('finalhandler'),
	serveStatic = require('serve-static'),
	serve = serveStatic(__dirname + '/../static', {
		'index': ['landing_page.html', 'index.html']
	}),
	fs = require('fs'),
	path = require('path');

var RequestRouter = function() {
	var handleGet = function(req, res) {
		var done = finalHandler(res, res);
		serve(req, res, done);
	};

	var handlePost = function(req, res) {
		var formidable = require('formidable'),
			uploadDir = __dirname + '/../run/',
			util = require('util'),
			form = new formidable.IncomingForm();

		form.uploadDir = uploadDir;

		form.parse(req, function(err, fields, files) {
			var tempFile = files.file,
				newFileName = 'upload_' + new Date().getTime().toString() + path.extname(tempFile.name);

			fs.rename(tempFile.path, path.join(uploadDir, newFileName), function(err) {
				console.log(err);
			});

			res.writeHead(302, {
				'content-type': 'text/html',
				'Location': '/'
			});

			res.end();
		});
	};

	var handleProhibitted = function(req, res) {
		res.writeHead(403, {
			'Content-type': 'text/plain',
		});
		res.write('Request not permitted');
		res.end();
	};

	this.handle = function(req, res) {
		if (req.method == 'GET') {
			handleGet(req, res);
		} else if (req.method == 'POST') {
			handlePost(req, res);
		} else {
			handleProhibitted(req, res);
		}
	};
};

module.exports = RequestRouter;