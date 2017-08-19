import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from '../Toolbar';

const { describe, test, expect } = global;

describe('Toolbar', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Toolbar><button>test</button></Toolbar>);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
