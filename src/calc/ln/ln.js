import BigNumber from '../../../node_modules/bignumber.js';
import Pi from '../pi/pi.js';

/* A function that approximates Ln(x) according to Simpson's formula
 * https://fr.wikipedia.org/wiki/Calcul_num%C3%A9rique_d%27une_int%C3%A9grale#Formule_de_Simpson
 * input:
 *  x: real number greater than 1 (BigNumber)
 *  N: a natural number greater than 1 for the number of divisions between 1 and a (BigNumber)
 * output: Ln(x)
 */
const LnArea = (x, N) => {
    if (x.lessThan(1) || N < 1) {
        throw `Error in Ln(x, N): x must be a real number >= 1 and N a natural positive number`;
    } else {
        let sum = new BigNumber(0);

        // The width of the rectangles
        let w = x.minus(new BigNumber(1)).dividedBy(N);

        for (let k = 0 ; k < N ; k++) {
            (() => {
                const a = (new BigNumber(1)).plus((new BigNumber(k)).times(w));
                const b = a.plus(w);
                // The height of a rectangle
                sum = sum.plus(
                    (new BigNumber(1)).dividedBy(a)
                    .plus((new BigNumber(8)).dividedBy(a.plus(b)))
                    .plus((new BigNumber(1)).dividedBy(b))
                );
            })()
        }
        return sum.times(w).dividedBy(new BigNumber(6));
    }
};

/*
 * A function that approximates Ln(x) with an error e
 * input:
 *  x: real number greater than 1 (BigNumber)
 *  e: the target error, provided as 10^(-e) (natural number)
 * output: Ln(x) (BigNumber)
 */
const Ln = (x, e) => {

    // Number of divisions required to reach this error
    const pow = (new BigNumber(10)).toPower(e);
    const pi = Pi(10,10).Pi;
    const N =   (new BigNumber(1))
                .dividedBy(new BigNumber(120))
                .times(pi.minus(new BigNumber(1)).toPower(5))
                .times(pow)
                .squareRoot()
                .squareRoot()
                .floor()
                .plus(new BigNumber(1));

    // Ln(x,N)
    return ({
        Ln: LnArea(x, N).times(pow).floor().dividedBy(pow),
        N: N
    });
};

export default {LnArea, Ln};