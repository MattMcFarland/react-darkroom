import Tooltip, { constants, styles, TooltipFactory } from '../index';

const { describe, test, expect } = global;

describe('index', () => {
  test('exports Tooltip', () => expect(Tooltip).toBeDefined());
  test('exports constants', () => expect(constants).toBeDefined());
  test('exports styles', () => expect(styles).toBeDefined());
  test('exports TooltipFactory', () => expect(TooltipFactory).toBeDefined());
});
