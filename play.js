class Play {
    constructor(name) { this.name = name; };

    calcAmount(audienceOfPerformance) {
    }
    calcVolumeCredits(audienceOfPerformance) {
    }
}
class Comedy extends Play {
    constructor(name) { super(name); };
    calcAmount(audienceOfPerformance) {
        var result = 30000;
        if (audienceOfPerformance > 20) {
            result += 10000 + 500 * (audienceOfPerformance - 20);
        }
        result += 300 * audienceOfPerformance;
        return result;
    }
    calcVolumeCredits(audienceOfPerformance) {
        var result = 0;
        result += Math.max(audienceOfPerformance - 30, 0);

        //add extra credits for every ten comedy attendees
        result += Math.floor(audienceOfPerformance / 10);
        return result;
    }
}
class Tragedy extends Play {
    constructor(name) { super(name); };
    calcAmount(audienceOfPerformance) {
        var result = 40000;
        if (audienceOfPerformance > 30) {
            result += 1000 * (audienceOfPerformance - 30);
        }
        return result;
    }
    calcVolumeCredits(audienceOfPerformance) {
        return Math.max(audienceOfPerformance - 30, 0);
    }
}
function retrievePlay(playString) {
    switch (playString.type) {
        case "tragedy":
            return new Tragedy(playString.name);
        case "comedy":
            return new Comedy(playString.name);
        default:
            throw new Error(`unknown type: $(playString.type)`);
    }
}
exports.retrievePlay = retrievePlay;