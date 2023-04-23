var retrieveCalculator = require('./calculator').retrievePlay;
function statementData(anInvoice, playsJSON) {
    let result = {};
    result.customer = anInvoice.customer;
    result.performances = enrichPerformances(anInvoice.performances);
    result.totalAmount = result.performances.reduce(function (tot, e) { return tot + e.amount; }, 0);
    result.volumeCredits = result.performances.reduce(function (tot, e) { return tot + e.volumeCredits; }, 0);
    return result;

    function addPlays() {
        let playsResult = [];
        for (let performance of anInvoice.performances) {
            playsResult.push(retrieveCalculator(playsJSON[performance.playID], performance.audience));
        }
        return playsResult
    }
    function enrichPerformances(performances) {
        let result = [];
        for (let performance of performances) {
            let play = playsJSON[performance.playID];
            let perf = Object.assign({}, performance);
            perf.play = playsJSON[performance.playID];
            perf.amount = retrieveCalculator(play, performance.audience).amount();
            perf.volumeCredits = retrieveCalculator(play, performance.audience).volumeCredits();
            result.push(perf);
        }
        return result;
    }
}
exports.statementData = statementData;