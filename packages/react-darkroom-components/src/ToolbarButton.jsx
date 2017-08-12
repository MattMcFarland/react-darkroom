import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const ToolbarButton = ({
  classes,
  children,
  onClick = () => {},
}) => (
  <button className={classes.button} onClick={onClick} type="button">
    {children}
  </button>
);

ToolbarButton.propTypes = {
  /** JSS styles */
  classes: PropTypes.shape({
    button: PropTypes.string,
  }).isRequired,
  /** React Child node(s) */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Onclick handler, no-op by default */
  onClick: PropTypes.func,
};

const styles = {
  button: {
    padding: 8,
    border: 'inherit',
    background: 'inherit',
    color: 'inherit',
    display: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      background: '#666',
    },
    '&[disabled]': {
      opacity: 0.2,
    },
  },
};

export default injectSheet(styles)(ToolbarButton);
