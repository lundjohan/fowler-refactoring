var invoices = require('./invoices.json');
var statement = require ('./printBill.js');

let result = statement.statement(invoices[0]).result;
console.log(result);
console.log("Hello from Johan!"); //works!