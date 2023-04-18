var retrievePlay = require('./play').retrievePlay;
function statementData(anInvoice, playsJSON) {
    let statementObj = {};
    enrichStatement(statementObj);
    return statementObj;

    function enrichStatement(obj) {
        addCustomer(obj);
        addPlays(obj);
        addAmount(obj);
        addVolumeCredits(obj);
        function addCustomer(obj) {
            obj.customer = anInvoice.customer;
        }
        function addPlays(obj) {
            let playsResult = [];
            for (let performance of anInvoice.performances) {
                playsResult.push(retrievePlay(playsJSON[performance.playID], performance.audience));
            }
            obj.plays = playsResult;
        }
        function addAmount(obj) {
            let amountPerPlay = [];
            obj.plays.forEach(e => { amountPerPlay.push(e.calcAmount()); });
            obj.amountPerPlay = amountPerPlay;
            obj.totalAmount = amountPerPlay.reduce(function (tot, e) { return tot + e; }, 0);
        }
        function addVolumeCredits(obj) {
            let totVolumeCredits = 0;
            obj.plays.forEach(e => { totVolumeCredits += e.calcVolumeCredits(); });
            obj.volumeCredits = totVolumeCredits;
        }

    }
}
exports.statementData = statementData;