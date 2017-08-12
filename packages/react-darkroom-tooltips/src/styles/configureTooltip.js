import merge from 'deepmerge';
import createTooltipStyle from './createTooltipStyle';
import base from './base';
import CARDINAL_DIRECTIONS from '../constants';

export default ({
  direction = CARDINAL_DIRECTIONS.S,
  radius = '0.2em',
  color = '#333',
  arrowSize = '0.5em',
}) =>
  merge(createTooltipStyle(direction, color, arrowSize, radius), base);
