let totalAmount = 0;
let volumeCredits = 0;
function statement(invoice, plays) {
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format;
    for (let performance of invoice.performances) {
        const play = plays[performance.playID];
        let thisAmount = calcAmount(play.type, performance.audience);
        calcVolumeCredits(play.type, performance.audience);

        //print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${performance.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    //totalAmount & volumeCredits are returned for testing purposes
    return { result, totalAmount, volumeCredits };
}
function calcAmount(typeOfPlay, audienceInPlay){
    var result = 0;
    switch (typeOfPlay) {
        case "tragedy":
            result = 40000;
            if (audienceInPlay > 30) {
                result += 1000 * (audienceInPlay - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (audienceInPlay > 20) {
                result += 10000 + 500 * (audienceInPlay - 20);
            }
            result += 300 * audienceInPlay;
            break;
        default:
            throw new Error(`unknown type: $(play.type)`);
    }
    return result;
}
function calcVolumeCredits(typeOfPlay, audienceInPlay){
    volumeCredits += Math.max(audienceInPlay - 30, 0);

    //add extra credits for every ten comedy attendees
    if ("comedy" === typeOfPlay) volumeCredits += Math.floor(audienceInPlay / 10);
}
exports.statement = statement;