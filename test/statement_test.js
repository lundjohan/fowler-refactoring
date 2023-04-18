var invoices = require('../invoices.json');
var statement = require('../printBill.js');
const playsJSON = require('../plays.json');
var assert = require('assert');

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
    it('result should not contained undefined values', function () {
        assert.equal(returnValue.result.includes("undefined"), false);
    });
});