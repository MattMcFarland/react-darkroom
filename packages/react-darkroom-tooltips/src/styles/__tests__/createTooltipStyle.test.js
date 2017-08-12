import {
  createTooltipStyle,
} from '../index';

const { describe, test, expect } = global;

describe('styles/createTooltipStyle', () => {
  test('createTooltipStyle creates tooltip stylesheet from given params', () => {
    expect(createTooltipStyle('s', 'color', 'arrowSize', 'radius')).toMatchSnapshot();
  });
});
