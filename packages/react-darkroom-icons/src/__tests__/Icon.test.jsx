import React from 'react';
import renderer from 'react-test-renderer';
import Icon from '../Icon';
import constants from '../constants';

const { describe, test, expect } = global;

const createIconTests = kinds =>
  Object.entries(kinds).map(([key, value]) =>
    ({ constantKey: key, mapsTo: value, node: <Icon key={key} kind={value} /> }));

describe('<Icon />', () => {
  const iconTests = createIconTests(constants);
  describe('constants are used to map to classnames', () => {
    iconTests.forEach(({ constantKey, mapsTo, node }) => {
      test(`${constantKey} maps to kind: ${mapsTo}`, () => {
        expect(renderer.create(node)).toMatchSnapshot();
      });
    });
  });
});

