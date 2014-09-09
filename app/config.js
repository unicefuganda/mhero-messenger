var Config = function() {
    var configDir = __dirname + '/../config';
    var fs = require('fs');
    var rawJson = fs.readFileSync(configDir + '/hero-config.json');
    var config = JSON.parse(rawJson);

    config.authentication = JSON.parse(fs.readFileSync(configDir + '/hero-auth-config.json'));

    return config;
};

module.exports = Config;