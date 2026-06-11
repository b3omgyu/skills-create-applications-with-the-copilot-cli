const { compute } = require('../calculator');

describe('Calculator compute()', () => {
  test('addition with +', () => {
    expect(compute('+', 2, 3)).toBe(5);
  });

  test('addition with add', () => {
    expect(compute('add', 10, 4)).toBe(14);
  });

  test('subtraction with -', () => {
    expect(compute('-', 10, 4)).toBe(6);
  });

  test('subtraction with sub', () => {
    expect(compute('sub', 7, 2)).toBe(5);
  });

  test('multiplication with *', () => {
    expect(compute('*', 45, 2)).toBe(90);
  });

  test('multiplication with x', () => {
    expect(compute('x', 3, 5)).toBe(15);
  });

  test('multiplication with mul', () => {
    expect(compute('mul', 4, 2.5)).toBe(10);
  });

  test('division with /', () => {
    expect(compute('/', 20, 5)).toBe(4);
  });

  test('division with div', () => {
    expect(compute('div', 9, 3)).toBe(3);
  });

  test('division by zero throws', () => {
    expect(() => compute('/', 5, 0)).toThrow('Division by zero');
  });

  test('unsupported operation throws', () => {
    expect(() => compute('%', 5, 2)).toThrow(/Unsupported operation/);
  });
});
