var invoices = require('./invoices.json');
var plays = require('./plays.json');
var statement = require ('./printBill.js');


let result = statement.statement(invoices[0], plays);
console.log(result);
console.log("Hello from Johan!"); //works!