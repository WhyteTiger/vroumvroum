// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

export class ScoreCalculator {
    static checkNumber(number, otherNumber) {
        if (number < otherNumber) {
            return 1;
        } else {
            return 0;
        }
    }
}

module.exports = ScoreCalculator;
