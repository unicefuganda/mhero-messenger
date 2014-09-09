var RapidProMessage = require(__dirname + '/../../app/rapid-pro-message');

describe('RapidProMessage', function () {
    describe('send', function () {
        var stubHttpRequest = {
            post: function(options) {
                var Q = require('q');
                var deferred = Q.defer();

                deferred.resolve(options);

                return deferred.promise;
            }
        };

        it('sends to rapid pro end point', function (done) {
            var message = new RapidProMessage(['tel:+256785169129'], 'Hello from test!');
            message.httpRequest = stubHttpRequest;
            message.send().then(function(options) {
                expect(options.body).toBe('{"urns":["tel:+256785169129"],"text":"Hello from test!"}');
                done();
            });
        });
    });
});