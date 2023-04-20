const statementData = require('./statementData').statementData;
function statement(invoiceJSON, playsJSON) {
    let result = "";
    for (let i = 0; i < invoiceJSON.length; i++) {
        let statementObj = statementData(invoiceJSON[i], playsJSON);
        toPrint(statementObj);
        result += statementObj.toPrint;
    }
    return result;
}
function toPrint(obj) {
    let result = ``;
    result += `Statement for ${obj.customer}\n`;

    //print line for this order
    obj.plays.forEach(p => { result += ` ${p.name}: ${usd(p.calcAmount())} (${p.audience} seats)\n`; });
    result += `Amount owed is ${usd(obj.totalAmount)}\n`;
    result += `You earned ${obj.volumeCredits} credits\n`;
    obj.toPrint = result;
    function usd(value) {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD",
                minimumFractionDigits: 2
            }).format(value/100);
    }
}
exports.statement = statement;