import React from 'react';
import renderer from 'react-test-renderer';

import Tooltip from '../Tooltip';
import constants from '../constants';

const { describe, test, expect } = global;

const createTests = positions =>
  Object.entries(positions).map(([key, value]) =>
    ({
      constantKey: key,
      mapsTo: value,
      node: (<Tooltip key={key} label="test" position={value} >test</Tooltip>),
    }));

describe('Tooltip', () => {
  const toolTipTests = createTests(constants);
  describe('constants are used to map to position props', () => {
    toolTipTests.forEach(({ constantKey, mapsTo, node }) => {
      test(`${constantKey} maps to position: ${mapsTo}`, () => {
        expect(renderer.create(node)).toMatchSnapshot();
      });
    });
  });
});

