import Tooltip, { constants } from '../index';

const { describe, test, expect } = global;

describe('index', () => {
  test('exports Tooltip', () => expect(Tooltip).toBeDefined());
  test('exports constants', () => expect(constants).toBeDefined());
});
