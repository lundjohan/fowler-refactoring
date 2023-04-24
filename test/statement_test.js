var invoices = require('../invoices.json');
const playsJSON = require('../plays.json');
var statement = require('../statement.js');
const statementData = require('../statementData').statementData;
var assert = require('assert');

let result = statement.statement(invoices,playsJSON);
describe('statement', function () {
    it('result should contain string Amount owed is $1,730.00', function () {
        assert.equal(result.includes("Amount owed is $1,730.00"), true);
    });
});
describe('statement', function () {
    it('result should contain Hamlet: $650.00 (55 seats)', function () {
        assert.equal(result.includes("Hamlet: $650.00 (55 seats)"), true);
    });
});

let returnValue = statementData(invoices[0], playsJSON);
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
describe('retrieveCalculator', function () {
    it('should throw error when non-existing play is arg', function () {
        assert.throws(() => retrieveCalculator({ type: "non-existing" }, 55), Error, "unknown type: non-existing");
    });
});
