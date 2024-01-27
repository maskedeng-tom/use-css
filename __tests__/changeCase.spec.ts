/**
 * @jest-environment node
**/

import { camel2Kebabu, kebabu2Camel } from '../src/lib/changeCase';

describe('changeCase', () => {
  test('camel2Kebabu', () => {

    expect(camel2Kebabu('Sample')).toBe('sample');
    expect(camel2Kebabu('SampleString')).toBe('sample-string');
    expect(camel2Kebabu('sampleString')).toBe('sample-string');

  });
  test('kebabu2Camel', () => {

    expect(kebabu2Camel('sample')).toBe('sample');
    expect(kebabu2Camel('sample-string')).toBe('sampleString');
    expect(kebabu2Camel('-sample-string')).toBe('SampleString');

  });
});
