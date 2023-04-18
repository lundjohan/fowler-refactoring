var invoices = require('../invoices.json');
var statement = require('../printBill.js');
const playsJSON = require('../plays.json');
var assert = require('assert');

let result = statement.statement(invoices,playsJSON);
let result2 = statement.statement(invoices,playsJSON);
describe('statement', function () {
    it('result should contain string Amount owed is $1,730.00', function () {
        assert.equal(result.includes("Amount owed is $1,730.00"), true);
    });
});


let returnValue = statement.statementData(invoices[0], playsJSON);
describe('statementData', function () {
    it('totalAmount', function () {
        assert.equal(returnValue.totalAmount, 173000);
    });
});
describe('statementData', function () {
    it('volumeCredits', function () {
        assert.equal(returnValue.volumeCredits, 43);
    });
});
describe('statementData', function () {
    it('result should contain Hamlet: $650.00 (55 seats)', function () {
        assert.equal(returnValue.result.includes("Hamlet: $650.00 (55 seats)"), true);
    });
});