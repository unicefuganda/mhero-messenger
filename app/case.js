var Case = function (row, headers) {
    var aCase = this;
    headers.forEach(function (header, position) {
        aCase[header] = row[position];
    });

    this.toRapidProMessage = function () {
        var formatDate = function (excelNumber) {
            var date = new Date('1900-1-1');
            date.setDate(date.getDate() + parseInt(excelNumber) - 2);
            var split = date.toDateString().split(" ");
            return split[1] + ' ' + split[2];
        };

        var RapidProMessage = require(__dirname + '/rapid-pro-message');
        return new RapidProMessage([this.phone],
                'Lab result for ' + this.case_id + ' is ' + this.result
                + '. Sample ' + formatDate(this.date_sample) + '. Onset '
                + formatDate(this.date_onset) + '. Test ' + formatDate(this.date_test) + '.');
    };
};

Case.load = function (filePath) {
    var Q = require('q');
    var deferred = Q.defer();

    var parseXlsx = require('excel');
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