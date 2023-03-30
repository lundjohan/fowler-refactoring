var invoices = require('../invoices.json');
var plays = require('../plays.json');
var statement = require('../printBill.js');
var assert = require('assert');

let returnValue = statement.statement(invoices[0], plays);

describe('statement', function () {
    it('totalAmount', function () {
        assert.equal(returnValue.totalAmount, 173000);
    });
});
describe('statement', function () {
    it('volumeCredits', function () {
        assert.equal(returnValue.volumeCredits, 43);
    });
});