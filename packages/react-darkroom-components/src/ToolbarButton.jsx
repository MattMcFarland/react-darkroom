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
  classes: PropTypes.shape({
    button: PropTypes.object,
  }),
  children: PropTypes.node,
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
