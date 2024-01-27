/**
 * @jest-environment node
**/

import { isSameArray } from '../src/lib/isSameArray';

describe('isSameArray', () => {
  test('basic', () => {
    expect(isSameArray(undefined, undefined)).toBe(false);
    expect(isSameArray(undefined, null)).toBe(false);
    expect(isSameArray(null, null)).toBe(false);
    expect(isSameArray(null, [])).toBe(false);
    expect(isSameArray(undefined, [])).toBe(false);
    expect(isSameArray([], [])).toBe(true);
    expect(isSameArray([], [1])).toBe(false);
    expect(isSameArray([1,2], [1,2])).toBe(true);
    expect(isSameArray([1,2], [1,3])).toBe(false);
  });
});
