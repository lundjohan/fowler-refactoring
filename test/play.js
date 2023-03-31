class Play {
    constructor(name) {
        this.name = name;
    }
    calcAmount(audienceOfPerformance) {
    }
    calcVolumeCredits(audienceOfPerformance) {
    }
}
class Comedy extends Play {
    constructor(name) {
        super(brand);
    }
    calcAmount(audienceOfPerformance) {
    }
    calcVolumeCredits(audienceOfPerformance) {
        var result = 0;
        result += Math.max(audienceInPlay - 30, 0);

        //add extra credits for every ten comedy attendees
        if ("comedy" === typeOfPlay) result += Math.floor(audienceInPlay / 10);
        return result;
    }
}
class Tragedy extends Play {
    constructor(name) {
        super(brand);
    }
    calcAmount(audienceOfPerformance) {
    }
    calcVolumeCredits(audienceOfPerformance) {
        return Math.max(audienceInPlay - 30, 0);
    }
}