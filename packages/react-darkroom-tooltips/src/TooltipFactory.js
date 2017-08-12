import injectSheet from 'react-jss';

import {
  compose,
  pure,
  setDisplayName,
} from 'recompose';

import { Tooltip } from './Tooltip';
import { configureTooltip } from './styles';
import CARDINAL_DIRECTIONS from './constants';

export default ({
  radius,
  color,
  arrowSize,
}) => {
  const styles = Object.values(CARDINAL_DIRECTIONS).reduce((acc, direction) =>
    Object.assign(acc, {
      [`tooltip-${direction}`]: configureTooltip({ direction, color, arrowSize, radius }),
    }), {});

  return compose(
    pure,
    injectSheet(styles),
    setDisplayName('Tooltip'),
  )(Tooltip);
};
