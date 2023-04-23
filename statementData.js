var retrievePlay = require('./calculator').retrievePlay;
function statementData(anInvoice, playsJSON) {
    let result = {};
    result.customer = anInvoice.customer;
    result.plays = addPlays();
    result.performances = enrichPerformances(anInvoice.performances);
    enrichStatement(result);
    result.volumeCredits = addVolumeCredits(result);
    return result;

    function addPlays() {
        let playsResult = [];
        for (let performance of anInvoice.performances) {
            playsResult.push(retrievePlay(playsJSON[performance.playID], performance.audience));
        }
        return playsResult
    }
    function enrichPerformances(performances) {
        let result = [];
        for (let performance of performances) {
            let play = playsJSON[performance.playID];
            let thisPerformance = Object.assign({}, performance);
            thisPerformance.play = playsJSON[performance.playID];
            thisPerformance.amount = retrievePlay(play, performance.audience).calcAmount();
            thisPerformance.volumeCredits = retrievePlay(play, performance.audience).calcVolumeCredits();
            result.push(thisPerformance);
        }
        return result;
    }
    function enrichStatement(obj) {
        addAmount(obj);
        addVolumeCredits(obj);
        
        function addAmount(obj) {
            let amountPerPlay = [];
            obj.plays.forEach(e => { amountPerPlay.push(e.calcAmount()); });
            obj.amountPerPlay = amountPerPlay;
            obj.totalAmount = amountPerPlay.reduce(function (tot, e) { return tot + e; }, 0);
        }
    }
    function addVolumeCredits(obj) {
        let totVolumeCredits = 0;
        obj.plays.forEach(e => { totVolumeCredits += e.calcVolumeCredits(); });
        return totVolumeCredits;
    }
}
exports.statementData = statementData;