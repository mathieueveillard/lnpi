import BigNumber from '../../../node_modules/bignumber.js';
import toQuotient from '../quotient/quotient.js';

/*
 * A function that determines the power of a number in a decimal basis
 * input: x, a real number
 * output: p, its power as a relative number
 */
const pow = x => {

    // x = y * 10^p, 0 <= y < 10
    let y = Math.abs(x);

    for (let p = 0 ; ; p++) {
        if (y < 10) return p;
        y /= 10;
    }
};

/*
 * A function that approximates a real number by a continuous fraction
 * https://fr.wikipedia.org/wiki/Fraction_continue#Algorithme
 * input:
 *  x: a real number (BigNumber object)
 *  x0: the original real number (for recursivity)
 *  e: the target error, provided as 10^(-e) (natural number)
 *  fraction: the fraction up to there (for recursivity)
 * output: a fraction approximating r (array of natural numbers)
 */
const toFractionRecursive = (x, x0, e, fraction) => {

    fraction = fraction || [];

    // Incomplete quotient
    const a = x.floor();

    // Stop if the fraction reduced as a rational number has enough significant numbers (approx)
    fraction = [...fraction, a.toNumber()];
    const sum_pow = fraction.map(a => pow(a)).reduce((sum, p) => sum + p);
    if (sum_pow > 19) {
        return [];
    }
    
    // Stop if the fraction reduced as a rational number has enough significant numbers
    const r = toQuotient(fraction);
    if (r.P.toString().length > 20 || r.Q.toString().length > 20) {
        return [];
    }
    
    // Stop if x is a rational number
    if (x.minus(a).toNumber() === 0) {
        return [a.toNumber()];
    }

    // Stop if the error is small enough
    if (x0.minus(r.P.dividedBy(r.Q)).absoluteValue().lessThanOrEqualTo((new BigNumber(10)).toPower(-e).dividedBy(new BigNumber(10)))) {
        return [a.toNumber()];
    }

    // Else return the incomplete quotient and calls recursively on the complete quotient
    return [
        a.toNumber(),
        ...toFractionRecursive((new BigNumber(1)).dividedBy(x.minus(a)), x0, e, fraction)
    ];
};

/*
 * Same function with precision
 *  x: a real number
 *  e: the target error, provided as 10^(-e) (natural number)
*/
const toFraction = (x, e) => {
    e = e || 100;
    return toFractionRecursive(x, x, e);
}

export default {pow, toFraction};