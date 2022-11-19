// __tests__/foo.test.js

import { sum } from '../components/foo';

test('basic', () => {
    expect(sum()).toBe(0);
});

test('basic again', () => {
    expect(sum(1, 2)).toBe(3);
});