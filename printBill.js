var retrievePlay = require('./play').retrievePlay;
const plays = require('./plays.json');
let totalAmount = 0;
function statement(invoice) {
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format;
    for (let performance of invoice.performances) {
        const play = retrievePlay(plays[performance.playID]);
        let thisAmount = play.calcAmount(performance.audience);
        totalAmount += thisAmount;
    }
    let volumeCredits = 0;
    for (let performance of invoice.performances) {
        const play = retrievePlay(plays[performance.playID]);
        volumeCredits += play.calcVolumeCredits(performance.audience);
    }
    for (let performance of invoice.performances) {
        const play = retrievePlay(plays[performance.playID]);
        let thisAmount = play.calcAmount(performance.audience);

        //print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${performance.audience} seats)\n`;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    //totalAmount & volumeCredits are returned for testing purposes
    return { result, totalAmount, volumeCredits };
}
exports.statement = statement;