import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
const styles = { 
  button: {
    padding: 8,
    border: 'inherit',
    background: 'inherit',
    color: 'inherit',
    display: 'inherit',
    '&:hover': {
      background: '#666'
    },
    '&[disabled]': {
      opacity: 0.2
    }
  }
}

const ToolbarButton = ({
  classes,
  children,
  icon,
  tooltip,
  onClick
}) => (
  <button className={classes.button} type="button">
    {children}
  </button>
);

ToolbarButton.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.object
  }),
  children: PropTypes.node,
  
}

export default injectSheet(styles)(ToolbarButton)
