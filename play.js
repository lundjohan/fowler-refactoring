class Play {
    constructor(name, audience) { this.name = name; this.audience=audience};

    calcAmount() {
    }
    calcVolumeCredits() {
    }
}
class Comedy extends Play {
    constructor(name, audience) { super(name,audience); };
    calcAmount() {
        var result = 30000;
        if (this.audience > 20) {
            result += 10000 + 500 * (this.audience - 20);
        }
        result += 300 * this.audience;
        return result;
    }
    calcVolumeCredits() {
        var result = 0;
        result += Math.max(this.audience - 30, 0);

        //add extra credits for every ten comedy attendees
        result += Math.floor(this.audience / 10);
        return result;
    }
}
class Tragedy extends Play {
    constructor(name, audience) { super(name,audience); };
    calcAmount() {
        var result = 40000;
        if (this.audience > 30) {
            result += 1000 * (this.audience - 30);
        }
        return result;
    }
    calcVolumeCredits() {
        return Math.max(this.audience - 30, 0);
    }
}
function retrievePlay(playString, audience) {
    switch (playString.type) {
        case "tragedy":
            return new Tragedy(playString.name, audience);
        case "comedy":
            return new Comedy(playString.name, audience);
        default:
            throw new Error(`unknown type: $(playString.type)`);
    }
}
exports.retrievePlay = retrievePlay;