import BigNumber from '../../../node_modules/bignumber.js';
import LnUtils from './ln.js';

it('LnArea(2, 100)', () => {
    expect(Math.round(LnUtils.LnArea(new BigNumber(2), 100) * 1000) / 1000).toEqual(.693);
});

it('Ln(2, 2)', () => {
    const res = LnUtils.Ln(new BigNumber(2), 2);
    expect(res.Ln.toNumber()).toEqual(.69);
});

it('Ln(2, 4)', () => {
    const res = LnUtils.Ln(new BigNumber(2), 4);
    expect(res.Ln.toNumber()).toEqual(.6931);
});

it('Ln(2, 8)', () => {
    const res = LnUtils.Ln(new BigNumber(2), 8);
    expect(res.Ln.toNumber()).toEqual(.69314718);
});