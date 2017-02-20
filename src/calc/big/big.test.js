import BigNumber from '../../../node_modules/bignumber.js';

it('0.3 - 0.1', () => {
  const x = new BigNumber('0.3');
  const y = new BigNumber('0.1');
  expect(x.minus(y).toString()).toEqual('0.2');
  expect(x.toString()).toEqual('0.3');
});

it('handles big values up to 20 digits', () => {
  const x = new BigNumber('10000000000000000000');
  const y = new BigNumber( '9999999999999999999');
  expect(x.minus(y).toString()).toEqual('1');
});

it('handles floor()', () => {
  const x = new BigNumber('10000000000000000000.01');
  expect(x.floor().toString()).toEqual('10000000000000000000');
  expect(x.toString()).toEqual('10000000000000000000.01');
});