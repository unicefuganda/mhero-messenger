var HttpRequest = function() {
    this.post = function(options){
        var Q = require('q');
        var deferred = Q.defer();

        var request = require('request');
        request.post(options, function (error, response, body) {
            deferred.resolve(body);
        });

        return deferred.promise;
    };
};

module.exports = HttpRequest;