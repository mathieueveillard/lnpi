import FractionUtils from './fraction.js';
import BigNumber from '../../../node_modules/bignumber.js';
import toQuotient from '../quotient/quotient.js';

it('pow(0)', () => {
  expect(FractionUtils.pow(0)).toEqual(0);
});

it('pow(9.9)', () => {
  expect(FractionUtils.pow(9.9)).toEqual(0);
});

it('pow(10)', () => {
  expect(FractionUtils.pow(10)).toEqual(1);
});

it('pow(11)', () => {
  expect(FractionUtils.pow(11)).toEqual(1);
});

it('pow(118793)', () => {
  expect(FractionUtils.pow(118793)).toEqual(5);
});

it('should convert 4 to fraction', () => {
  expect(FractionUtils.toFraction(new BigNumber('4'))).toEqual([4]);
});

it('should convert 3/2 to fraction', () => {
  expect(FractionUtils.toFraction(new BigNumber('1.5'))).toEqual([1, 2]);
});

it('should convert 7/5 to fraction', () => {
  expect(FractionUtils.toFraction(new BigNumber('1.4'))).toEqual([1, 2, 2]);
});

it('should convert 2.28368897983 to fraction with error < 10^-5', () => {
  const quotient = toQuotient(FractionUtils.toFraction(new BigNumber(2.28368897983),5));
  expect(quotient.P.dividedBy(quotient.Q).times(100000).floor().dividedBy(new BigNumber(100000)).toNumber()).toEqual(2.28368);
});

it('should convert Pi to fraction', () => {
  const Pi = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';
  const quotient = toQuotient(FractionUtils.toFraction(new BigNumber(Pi)));
  expect(quotient.P.toString().length).toBeLessThanOrEqual(20);
  expect(quotient.Q.toString().length).toBeLessThanOrEqual(20);
});