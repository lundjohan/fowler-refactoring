class Calculator {
    constructor(name, audience) { this.name = name; this.audience=audience};

    get amount() {
    }
    get volumeCredits() {
    }
}
class ComedyCalculator extends Calculator {
    get amount() {
        var result = 30000;
        if (this.audience > 20) {
            result += 10000 + 500 * (this.audience - 20);
        }
        result += 300 * this.audience;
        return result;
    }
    get volumeCredits() {
        var result = 0;
        result += Math.max(this.audience - 30, 0);

        //add extra credits for every ten comedy attendees
        result += Math.floor(this.audience / 10);
        return result;
    }
}
class TragedyCalculator extends Calculator {
    get amount() {
        var result = 40000;
        if (this.audience > 30) {
            result += 1000 * (this.audience - 30);
        }
        return result;
    }
    get volumeCredits() {
        return Math.max(this.audience - 30, 0);
    }
}
function createCalculator(playString, audience) {
    switch (playString.type) {
        case "tragedy":
            return new TragedyCalculator(playString.name, audience);
        case "comedy":
            return new ComedyCalculator(playString.name, audience);
        default:
            throw new Error(`unknown type: $(playString.type)`);
    }
}
exports.retrievePlay = createCalculator;