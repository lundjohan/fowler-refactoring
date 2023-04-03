var retrievePlay = require('./play').retrievePlay;
const playsJSON = require('./plays.json');
let totalAmount = 0;
function statement(invoice) {
    let result = `Statement for ${invoice.customer}\n`;

    for (let performance of invoice.performances) {
        const play = retrievePlay(playsJSON[performance.playID]);
        let thisAmount = play.calcAmount(performance.audience);
        totalAmount += thisAmount;
    }
    for (let performance of invoice.performances) {
        const play = retrievePlay(playsJSON[performance.playID]);
        let thisAmount = play.calcAmount(performance.audience);

        //print line for this order
        result += ` ${play.name}: ${usd(thisAmount / 100)} (${performance.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount / 100)}\n`;
    result += `You earned ${totalVolumeCredits(invoice.performances)} credits\n`;

    //totalAmount & volumeCredits are returned for testing purposes
    var volumeCredits = totalVolumeCredits(invoice.performances);
    return { result, totalAmount, volumeCredits };
}
function totalVolumeCredits(performances) {
    let result = 0;
    for (let performance of performances) {
        const play = retrievePlay(playsJSON[performance.playID]);
        result += play.calcVolumeCredits(performance.audience);
    }
    return result;
}
function usd(value) {
    const format = new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format;
}
exports.statement = statement;