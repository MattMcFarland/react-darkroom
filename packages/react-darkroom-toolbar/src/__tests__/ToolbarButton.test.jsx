import React from 'react';
import { shallow } from 'enzyme';

import ToolbarButton from '../Toolbar';

const { describe, test, expect } = global;

describe('Toolbar', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ToolbarButton>test</ToolbarButton>);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
