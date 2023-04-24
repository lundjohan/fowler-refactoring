var createCalculator = require('./calculator').retrievePlay;
function statementData(anInvoice, playsJSON) {
    let result = {};
    result.customer = anInvoice.customer;
    result.performances = anInvoice.performances.map(enrichPerformance);
    result.totalAmount = result.performances.reduce((tot, e) => tot + e.amount, 0);
    result.volumeCredits = result.performances.reduce((tot, e) => tot + e.volumeCredits, 0);
    return result;
    function enrichPerformance(aPerformance) {
        let result = Object.assign({}, aPerformance);
        result.play = playsJSON[aPerformance.playID];
        result.amount = createCalculator(result.play, result.audience).amount;
        result.volumeCredits = createCalculator(result.play, result.audience).volumeCredits;
        return result;
    }
}
exports.statementData = statementData;