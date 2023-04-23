var retrievePlay = require('./play').retrievePlay;
function statementData(anInvoice, playsJSON) {
    let result = {};
    result.customer = anInvoice.customer;
    result.plays = addPlays();
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