var Config = require(__dirname + '/config');
var config = new Config();

var RapidProMessage = function (aCase) {
    var HttpRequest = require(__dirname + '/http-request');
    this.httpRequest = new HttpRequest();

    this.urns = ['tel:' + formatPhoneNumber(aCase.phone)];
    this.text = aCase.toSmsText();

    this.send = function () {
        return this.httpRequest.post({
            headers: {
                'content-type': 'application/json',
                Authorization: 'Token ' + config.authentication.rapidpro.token
            },
            url: config.rapidProMessageEndPoint,
            body: JSON.stringify({urns: this.urns, text: this.text})
        }).then(function (responseBody) {
            try {
                var responseObject = JSON.parse(responseBody);
                aCase.status = (responseObject.messages && responseObject.sms) ? 'success' : 'fail';
            } catch (error) {
                aCase.status = 'fail';
            }
            return aCase;
        });
    };

    function formatPhoneNumber(rawPhoneNumber) {
        var phoneNumber = rawPhoneNumber.trim().replace(/[^\d\+]/g, '');
        if (phoneNumber[0] != '0') {
            return phoneNumber;
        }
        return '+231' + phoneNumber.slice(1);
    }
};

module.exports = RapidProMessage;