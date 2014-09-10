var Case = require(__dirname + '/../../app/case');
var RapidProMessage = require(__dirname + '/../../app/rapid-pro-message');

describe('RapidProMessage', function () {
    describe('send', function () {
        var StubHttpRequest = function (httpResponse) {
            var self = this;
            this.post = function (options) {
                var Q = require('q');
                var deferred = Q.defer();

                self.postedOptions = options;
                deferred.resolve(httpResponse);

                return deferred.promise;
            }
        };

        var buildCase = function () {
            var aCase = new Case(null, []);
            aCase.phone = '+256785169129';
            aCase.toSmsText = function () {
                return 'Hello from test!';
            };
            return aCase;
        };

        it('sends to rapid pro end point', function (done) {
            var aCase = buildCase();
            var message = new RapidProMessage(aCase);
            var stubHttpRequest = new StubHttpRequest('{"messages": [4984985], "sms": [4984985]}');
            message.httpRequest = stubHttpRequest;

            message.send().then(function (response) {
                expect(response).toBe(aCase);
                expect(response.status).toBe('success');
                expect(stubHttpRequest.postedOptions.body).toBe('{"urns":["tel:+256785169129"],"text":"Hello from test!"}');
                done();
            });
        });

        it('returns fail status if http response is empty', function (done) {
            var aCase = buildCase();
            var message = new RapidProMessage(aCase);
            var stubHttpRequest = new StubHttpRequest('');
            message.httpRequest = stubHttpRequest;

            message.send().then(function (response) {
                expect(response).toBe(aCase);
                expect(response.status).toBe('fail');
                expect(stubHttpRequest.postedOptions.body).toBe('{"urns":["tel:+256785169129"],"text":"Hello from test!"}');
                done();
            });
        });

        it('returns fail status if response is not expected rapid pro format', function (done) {
            var aCase = buildCase();
            var message = new RapidProMessage(aCase);
            var stubHttpRequest = new StubHttpRequest('{}');
            message.httpRequest = stubHttpRequest;

            message.send().then(function (response) {
                expect(response).toBe(aCase);
                expect(response.status).toBe('fail');
                expect(stubHttpRequest.postedOptions.body).toBe('{"urns":["tel:+256785169129"],"text":"Hello from test!"}');
                done();
            });
        });
    });
})
;