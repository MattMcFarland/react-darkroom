import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {
  compose,
  pure,
  setDisplayName,
} from 'recompose';

import CARDINAL_DIRECTIONS from './constants';
import { configureTooltip } from './styles';

export const Tooltip = ({
  position,
  classes,
  children,
  label,
}) =>
  (<span className={classes[`tooltip-${position}`]} data-label={label}>{children}</span>);

Tooltip.propTypes = {
  /**
   * The message displayed in the tooltip
   */
  label: PropTypes.string.isRequired,
  /** Determines the position the tooltip appears from, 
   * Default: 's'
   * 
   * One of the following: `nw, n, ne, e, se, s, sw, w` */
  position: PropTypes.oneOf(Object.values(CARDINAL_DIRECTIONS)),
  /** @ignore JSS */
  classes: PropTypes.shape({
    'tooltip-nw': PropTypes.string,
    'tooltip-n': PropTypes.string,
    'tooltip-ne': PropTypes.string,
    'tooltip-e': PropTypes.string,
    'tooltip-se': PropTypes.string,
    'tooltip-s': PropTypes.string,
    'tooltip-sw': PropTypes.string,
    'tooltip-w': PropTypes.string,
  }).isRequired,
  /** Element to which the tooltip belongs, like a `<Button>` */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

Tooltip.defaultProps = {
  position: 's',
};

export const TooltipFactory = ({
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

export default TooltipFactory({
  radius: '0.3em',
  color: '#333',
  arrowSize: '0.5em',
});
