var retrievePlay = require('./play').retrievePlay;
function statement(invoiceJSON, playsJSON) {
    let result = "";
    for (let i = 0; i < invoiceJSON.length; i++) {
        result += statementData(invoiceJSON[i], playsJSON).result;
    }
    return result;
}
function statementData(anInvoice, playsJSON) {
    function totalVolumeCredits(performances) {
        let result = 0;
        for (let performance of performances) {
            const play = retrievePlay(playsJSON[performance.playID]);
            result += play.calcVolumeCredits(performance.audience);
        }
        return result;
    }
    let result = `Statement for ${anInvoice.customer}\n`;

    let totalAmount = 0;
    for (let performance of anInvoice.performances) {
        const play = retrievePlay(playsJSON[performance.playID]);
        let thisAmount = play.calcAmount(performance.audience);

        //print line for this order
        result += ` ${play.name}: ${usd(thisAmount / 100)} (${performance.audience} seats)\n`;

        totalAmount += thisAmount;
    }
    result += `Amount owed is ${usd(totalAmount / 100)}\n`;
    result += `You earned ${totalVolumeCredits(anInvoice.performances)} credits\n`;

    //totalAmount & volumeCredits are returned for testing purposes
    var volumeCredits = totalVolumeCredits(anInvoice.performances);
    return { result, totalAmount, volumeCredits };
}
function usd(value) {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(value);
}
exports.statement = statement;
exports.statementData = statementData;