var Q = require('q');
var parseXlsx = require('excel');

var Case = function (row, headers) {
    var aCase = this;
    headers.forEach(function (header, position) {
        aCase[header] = row[position];
    });
};

Case.load = function (filePath) {
    var deferred = Q.defer();

    parseXlsx(filePath, function (err, data) {
        var headers = data[0];
        var realData = data.slice(1).filter(function (row) {
            return row[0].length > 0;
        });

        var cases = realData.map(function (row) {
            return new Case(row, headers);
        });

        deferred.resolve(cases);
    });

    return deferred.promise;
};

module.exports = Case;