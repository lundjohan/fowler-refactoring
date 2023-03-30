let totalAmount = 0;
let volumeCredits = 0;
function statement(invoice, plays) {
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format;
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = calcAmount(play.type, perf.audience);
        calcVolumeCredits(play.type, perf.audience);

        //print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    //totalAmount & volumeCredits are returned for testing purposes
    return { result, totalAmount, volumeCredits };
}
function calcAmount(typeOfPlay, audienceInPlay){
    var thisAmount = 0;
    switch (typeOfPlay) {
        case "tragedy":
            thisAmount = 40000;
            if (audienceInPlay > 30) {
                thisAmount += 1000 * (audienceInPlay - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (audienceInPlay > 20) {
                thisAmount += 10000 + 500 * (audienceInPlay - 20);
            }
            thisAmount += 300 * audienceInPlay;
            break;
        default:
            throw new Error(`unknown type: $(play.type)`);
    }
    return thisAmount;
}
function calcVolumeCredits(typeOfPlay, audienceInPlay){
    volumeCredits += Math.max(audienceInPlay - 30, 0);

    //add extra credits for every ten comedy attendees
    if ("comedy" === typeOfPlay) volumeCredits += Math.floor(audienceInPlay / 10);
}
exports.statement = statement;