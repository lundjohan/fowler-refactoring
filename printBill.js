const statementData = require('./statementData').statementData;
function statement(invoiceJSON, playsJSON) {
    let result = "";
    invoiceJSON.forEach(i => { result += toPrint(statementData(i, playsJSON)); });
    return result;
}
function toPrint(obj) {
    let result = `Statement for ${obj.customer}\n`;

    //print line for this order
    obj.plays.forEach(p => { result += ` ${p.name}: ${usd(p.calcAmount())} (${p.audience} seats)\n`; });
    result += `Amount owed is ${usd(obj.totalAmount)}\n`;
    result += `You earned ${obj.volumeCredits} credits\n`;
    return result;
    function usd(value) {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD",
                minimumFractionDigits: 2
            }).format(value/100);
    }
}
exports.statement = statement;