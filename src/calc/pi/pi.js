import BigNumber from '../../../node_modules/bignumber.js';

/*
 * A function that approximates Pi according to Leibniz formula
 * https://fr.wikipedia.org/wiki/Pi#Approximation_de_.CF.80
 * input: i,j : orders of approximation (natural positive numbers)
 * output: {
 *    Series: terms of the suite (2 dimentional array of BigNumbers)
 *    Pi: the best approximation of Pi (BigNumber)
 * }
 */
const Pi = (i, j) => {

    if (i < 0 || j < 0) {
        throw `Error in Pi(i, j): i and j should be natural positive numbers`;
    } else {

        // First j terms of Leibniz's suite
        let Pi = [[new BigNumber(0)]];
        for (let k = 0 ; k < i + j ; k++) {
            Pi[0][k + 1] = Pi[0][k].plus((new BigNumber(4)).times(new BigNumber(k % 2 === 0 ? 1 : -1)).dividedBy(new BigNumber(2 * k + 1)));
        }

        // Other terms from bottom to top
        for (let k = 1 ; k <= i ; k++) {
            Pi[k] = [];
            for (let l = j ; l <= i + j - k ; l++) {
                Pi[k][l] = Pi[k - 1][l].plus(Pi[k - 1][l + 1]).dividedBy(new BigNumber(2));
            }
        }

        // Return: all terms and a direct access to the last one
        return ({
            Suite: Pi,
            Pi: Pi[i][j]
        });
    }
};

export default Pi;