var Case = require(__dirname + '/../../app/case');

describe('Case', function () {
    var xlsxFile = __dirname + '/../fixtures/sample.xlsx';

    describe('load', function () {
        it('loads all cases from an xlsx file', function (done) {
            Case.load(xlsxFile).then(function (allCases) {
                expect(allCases.length).toBe(8);

                var firstCase = allCases[0];
                expect(firstCase['cds_lname']).toBe('Reed');
                expect(firstCase['cds_fname']).toBe('Pierre');
                expect(firstCase['date_onset']).toBe('41724');
                expect(firstCase['result']).toBe('NEG');

                done();
            });
        });
    });

    describe('toRapidProMessage', function () {
        it('generates rapid pro message', function (done) {
            Case.load(xlsxFile).then(function (allCases) {
                var firstCase = allCases[0];
                var rapidProMessage = firstCase.toRapidProMessage();
                expect(rapidProMessage.urns).toEqual(['tel:+231770003983']);
                expect(rapidProMessage.text).toBe('Lab result for LIB-NIM-001 is NEG. Sample Mar 30. Onset Mar 26. Test Apr 04.');

                var anotherCase = allCases[4];
                expect(anotherCase.toRapidProMessage().urns).toEqual(['tel:+231775090898']);

                done();
            });
        });
    });
});