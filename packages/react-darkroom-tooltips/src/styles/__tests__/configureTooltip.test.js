import {
  configureTooltip,
} from '../index';

const { describe, test, expect } = global;

describe('styles/configureTooltip', () => {
  test('configures tooltips for future use', () => {
    const options = {
      position: 'test',
      radius: 'test',
      color: 'test',
      arrowSize: 'test',
    };
    expect(configureTooltip(options)).toMatchSnapshot();
  });
});
