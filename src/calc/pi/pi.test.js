import BigNumber from '../../../node_modules/bignumber.js';
import Pi from './pi.js';

it('should approximate Pi(0, 4)', () => {
  expect(Pi(0, 4).Pi).toEqual(
    (new BigNumber(4))
    .minus((new BigNumber(4/1)).dividedBy(new BigNumber(3)))
    .plus(new BigNumber(4/5))
    .minus((new BigNumber(4)).dividedBy(new BigNumber(7)))
  );
});

it('should approximate Pi(10, 10)', () => {
  const pi = Pi(10,10).Pi;
  expect(pi.times((new BigNumber(10)).toPower(9)).floor().dividedBy((new BigNumber(10)).toPower(9)).toNumber()).toEqual(3.141592653);
});