import toQuotient from './quotient.js';

it('should reduce fraction [1]', () => {
  const quotient = toQuotient([1]);
  expect({P: quotient.P.toString(), Q: quotient.Q.toString()}).toEqual({P: '1', Q: '1'});
});

it('should reduce fraction [1, 2]', () => {
  const quotient = toQuotient([1, 2]);
  expect({P: quotient.P.toString(), Q: quotient.Q.toString()}).toEqual({P: '3', Q: '2'});
});

it('should reduce fraction [1, 2, 2]', () => {
  const quotient = toQuotient([1, 2, 2]);
  expect({P: quotient.P.toString(), Q: quotient.Q.toString()}).toEqual({P: '7', Q: '5'});
});

it('should reduce fraction [2, 3, 1, 1, 9, 1, 1, 48]', () => {
  const quotient = toQuotient([2, 3, 1, 1, 9, 1, 1, 48]);
  expect({P: quotient.P.toString(), Q: quotient.Q.toString()}).toEqual({P: '15625', Q: '6842'});
});