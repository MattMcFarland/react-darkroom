import React from 'react';
import PropTypes from 'prop-types';
import CARDINAL_DIRECTIONS from './constants';

import { TooltipFactory } from './';

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

export default TooltipFactory({
  radius: '0.3em',
  color: '#333',
  arrowSize: '0.5em',
});
