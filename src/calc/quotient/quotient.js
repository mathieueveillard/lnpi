import BigNumber from '../../../node_modules/bignumber.js';

/*
 * A function that reduces a fraction to a quotient
 * https://fr.wikipedia.org/wiki/Fraction_continue
 * input: a fraction [a0, ..., aN], a0...aN being natural numbers
 * output: its reduction {P, Q}, P, Q being natural numbers as BigNumbers
 */
const toQuotient = fraction => {
    if (fraction === []) {
        throw `Error in toQuotient(): cannot reduce an empty fraction`;
    } else {
        const a = new BigNumber(fraction[0].toString());

        // Case of a natural number
        if (fraction.length === 1) {
            return {P: a, Q: 1};
        } else {

            // Calls recursively on the slice after the second term
            // And adds the result to the first term by putting on the same denominator
            const {P, Q} = toQuotient(fraction.slice(1, fraction.length));
            const result = {
                P: a.times(P).plus(Q),
                Q: P
            };
            return ({
                ...result,
                evaluate: () => result.P.dividedBy(result.Q)
            });
        }
    }
};

export default toQuotient;