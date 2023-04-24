var invoices = require('./invoices.json');
var statement = require ('./statement.js');
const playsJSON = require('./plays.json');

let result = statement.statement(invoices,playsJSON);
console.log(result);