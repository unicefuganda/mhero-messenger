var Case = require(__dirname + '/../../app/case');

describe('Case', function () {
    describe('load', function () {
        it('loads all cases from an xlsx file', function (done) {
            var xlsxFile = __dirname + '/../fixtures/sample.xlsx';
            Case.load(xlsxFile).then(function (allCases) {
                expect(allCases.length).toBe(8);
                var firstCase = allCases[0];
                expect(firstCase['cds_lname']).toBe('Reed');
                expect(firstCase['cds_fname']).toBe('Pierre');
                expect(firstCase['result']).toBe('NEG');
                done();
            });
        });
    });
});