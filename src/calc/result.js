import BigNumber from '../../node_modules/bignumber.js';
import Pi from './pi/pi.js';
import LnUtils from './ln/ln.js';
import FractionUtils from './fraction/fraction.js';
import toQuotient from './quotient/quotient.js';

const toError = (x, e) => {
    return x.times((new BigNumber(10)).toPower(e)).floor().dividedBy((new BigNumber(10)).toPower(e));
}

const bundle = e => {

    BigNumber.config({ DECIMAL_PLACES: e });

    // Pi is given with an error of 10^-9 by Pi(10,10)
    //const pi = Pi(10,10).Pi;
    const pi = new BigNumber('3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679');
    console.log(`Pi with error 10^-${e + 1}: ${toError(pi, e + 1).toString()}`);

    // Ln(Pi)
    const lnpi = LnUtils.Ln(pi, e).Ln;
    console.log(`Ln(Pi) with error 10^-${e}: ${lnpi.toString()}`);

    // Ln(Pi) to fraction
    const fraction = FractionUtils.toFraction(lnpi, e);
    console.log(`Ln(Pi) as a fraction with error 10^-${e}: [${fraction.join(', ')}]`);

    // Ln(Pi) to quotient
    const quotient = toQuotient(fraction);
    console.log(`Ln(Pi) as a rational number with error 10^-${e}: ${quotient.P.toString()} / ${quotient.Q.toString()} (${toError(quotient.P.dividedBy(quotient.Q), e).toString()})`);

    // Control
    console.log(`Ln(Pi) given by JS's Math module: ${toError(new BigNumber(Math.log(Math.PI).toString()), e)}`);
};

const test1 = e => {

    BigNumber.config({ DECIMAL_PLACES: e });

    // Pi
    const pi = new BigNumber('3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679');
    console.log(`Pi with error 10^-${e + 1}: ${toError(pi, e + 1).toString()}`);

    // Ln(Pi)
    const lnpi = LnUtils.Ln(pi, e).Ln;
    console.log(`Ln(Pi) with error 10^-${e}: ${lnpi.toString()}`);
};

const test2 = e => {

    BigNumber.config({ DECIMAL_PLACES: e });

    const pi = new BigNumber('3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679');
    console.log(`Pi: ${pi.toString()}`);

    // Ln(Pi) to fraction
    const fraction = FractionUtils.toFraction(pi, e);
    console.log(`Pi as a fraction with error 10^-${e}: [${fraction.join(', ')}]`);

    // Ln(Pi) to quotient
    const quotient = toQuotient(fraction);
    console.log(`Pi as a rational number with error 10^-${e}: ${quotient.P.toString()} / ${quotient.Q.toString()} (${toError(quotient.P.dividedBy(quotient.Q), e).toString()})`);
};

const result = () => {
//    test2(30);
    bundle(36);
    return true;
};

export default result;