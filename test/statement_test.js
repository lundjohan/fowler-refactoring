var invoices = require('../invoices.json');
var plays = require('../plays.json');
var statement = require('../printBill.js');
var assert = require('assert');

let result = statement.statement(invoices[0], plays);

describe('statement', function () {
    it('should show equal string', function () {
        assert.equal(
        `Statement for BigCo
        Hamlet: $650.00 (55 seats)
        As You Like It: $580.00 (35 seats)
        Othello: $500.00 (40 seats)
        Amount owed is $1,730.00
        You earned 43 credits`,
        result);
    });
});