#!/usr/bin/env node

var exec = require('child_process').exec;

var Case = require(__dirname + '/../app/case');
Case.load(__dirname + '/../test/fixtures/sample.xlsx').then(function (allCases) {
    var rapidProMessages = allCases.map(function (aCase) {
        return aCase.toRapidProMessage();
    });
    rapidProMessages.forEach(function (message) {
        message.send().then(function(responseBody) {
            console.log('--> Sent:');
            console.log(message);
            console.log('<-- Got:\n' + responseBody);
        });
    });
});