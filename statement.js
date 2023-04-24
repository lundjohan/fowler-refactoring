const statementData = require('./statementData').statementData;
function statement(invoiceJSON, playsJSON) {
    let result = "";
    invoiceJSON.forEach(i => { result += toPrint(statementData(i, playsJSON)); });
    return result;
}
function toPrint(obj) {
    let result = `Statement for ${obj.customer}\n`;
    obj.performances.forEach(p => { result += ` ${p.play.name}: ${usd(p.amount)} (${p.audience} seats)\n`; });
    result += `Amount owed is ${usd(obj.totalAmount)}\n`;
    result += `You earned ${obj.volumeCredits} credits\n`;
    return result;
}
function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber / 100);
}
exports.statement = statement;