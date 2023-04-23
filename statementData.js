var retrieveCalculator = require('./calculator').retrievePlay;
function statementData(anInvoice, playsJSON) {
    let result = {};
    result.customer = anInvoice.customer;
    //result.performances = enrichPerformances(anInvoice.performances);
    result.performances = anInvoice.performances.map(enrichPerformance);
    result.totalAmount = result.performances.reduce((tot, e) => tot + e.amount, 0);
    result.volumeCredits = result.performances.reduce((tot, e) => tot + e.volumeCredits, 0);
    return result;
    /*function enrichPerformances(performances) {
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
    }*/
    function enrichPerformance(aPerformance) {
        let result = Object.assign({}, aPerformance);
        result.play = playsJSON[aPerformance.playID];
        result.amount = retrieveCalculator(result.play, result.audience).amount();
        result.volumeCredits = retrieveCalculator(result.play, result.audience).volumeCredits();
        return result;
    }
}
exports.statementData = statementData;