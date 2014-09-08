var Q = require('q');
var parseXlsx = require('excel');

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

        var formatPhoneNumber = function(rawPhoneNumber){
            var phoneNumber = rawPhoneNumber.trim().replace(/[^\d\+]/g, '');
            return '+231' + phoneNumber.slice(1);
        };

        return {
            urns: ['tel:' + formatPhoneNumber(this.phone)],
            text: 'Lab result for ' + this.case_id + ' is ' + this.result
                + '. Sample ' + formatDate(this.date_sample) + '. Onset '
                + formatDate(this.date_onset) + '. Test ' + formatDate(this.date_test) + '.'
        };
    };
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