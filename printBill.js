var retrievePlay = require('./play').retrievePlay;
function statement(invoiceJSON, playsJSON) {
    let result = "";
    for (let i = 0; i < invoiceJSON.length; i++) {
        let statementObj = statementData(invoiceJSON[i], playsJSON);
        toPrint(statementObj);
        result += statementObj.toPrint;
    }
    return result;
}
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
function toPrint(obj) {
    let result = ``;
    result += `Statement for ${obj.customer}\n`;

    //print line for this order
    obj.plays.forEach(p => { result += ` ${p.name}: ${usd(p.calcAmount() / 100)} (${p.audience} seats)\n`; });
    result += `Amount owed is ${usd(obj.totalAmount / 100)}\n`;
    result += `You earned ${obj.volumeCredits} credits\n`;
    obj.toPrint = result;
    function usd(value) {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD",
                minimumFractionDigits: 2
            }).format(value);
    }
}
exports.statement = statement;
exports.statementData = statementData;