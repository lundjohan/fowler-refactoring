var invoices = require('./invoices.json');
var statement = require ('./printBill.js');
const playsJSON = require('./plays.json');

let result = statement.statement(invoices,playsJSON);
console.log(result);
console.log("Hello from Johan!"); //works!