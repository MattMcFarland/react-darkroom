import {
  createTooltipStyle,
  configureTooltip,
  base,
} from '../index';

const { describe, test, expect } = global;

describe('styles/index', () => {
  test('exports createTooltipStyle', () => expect(createTooltipStyle).toBeDefined());
  test('exports configureTooltip', () => expect(configureTooltip).toBeDefined());
  test('exports base', () => expect(base).toBeDefined());
});
