var finalHandler = require('finalhandler'),
    serveStatic = require('serve-static'),
    serve = serveStatic(__dirname + '/../static', {
        'index': ['landing_page.html', 'index.html'],
        'etag': false   // FIXME: I don't know...it fails on the linux server without this option
    }),
    fs = require('fs'),
    path = require('path');

var RequestRouter = function () {
    var handleGet = function (req, res) {
        var done = finalHandler(req, res);
        serve(req, res, done);
    };

    var handlePost = function (req, res) {
        var formidable = require('formidable'),
            form = new formidable.IncomingForm();

        form.uploadDir = __dirname + '/../run/';

        form.parse(req, function (err, fields, files) {
            var tempFile = files.file;
            sendMessages(tempFile.path).then(function (resopnses) {
                console.log("-----starting upload-----");
                console.log(resopnses);
                res.writeHead(302, {
                    'content-type': 'text/html',
                    'Location': req.headers.referer,
                    'Set-Cookie': 'RapidProResponse=' + JSON.stringify(resopnses)
                });

                res.end();
            });
        });
    };

    var handleProhibitted = function (req, res) {
        res.writeHead(403, {
            'Content-type': 'text/plain'
        });
        res.write('Request not permitted');
        res.end();
    };

    var sendMessages = function (filePath) {
        Case = require('./case');

        return Case.load(filePath).then(function (allCases) {
            var rapidProMessages = allCases.map(function (aCase) {
                return aCase.toRapidProMessage();
            });
            var sendPromises = rapidProMessages.map(function (message) {
                return message.send();
            });

            var Q = require('q');
            return Q.all(sendPromises);
        });
    };

    this.handle = function (req, res) {
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
