import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const Toolbar = ({ classes, children }) =>
  (<menu className={classes.menu}>
    <ul className={classes.list}>
      { React.Children.toArray(children).map((node, index) =>
        <li className={classes.listItem} key={`toolbar-${index + 1}`}>{node}</li>) }
    </ul>
  </menu>);

Toolbar.propTypes = {
  /** @ignore JSS styles */
  classes: PropTypes.shape({
    menu: PropTypes.string,
    list: PropTypes.string,
  }).isRequired,
  /** The buttons which exist in the toolbar, 
   * best results are used in conjunction with `<ToolbarButton/>` but can be anything! */
  children: PropTypes.node,
};

const styles = {
  menu: {
    margin: 0,
    padding: '0 8px',
    background: '#444',
    color: '#eee',
    display: 'inline-block',
    position: 'relative',
    borderRadius: 3,
    fontSize: 20,
    lineHeight: 1,
    '&:before': {
      content: ' ',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
      border: 'solid rgba(255, 255, 255, 0)',
      borderColor: 'rgba(255, 255, 255, 0)',
      borderWidth: 10,
      bottom: -20,
      left: '1em',
      marginLeft: -10,
    },
    '&:after': {
      content: ' ',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
      border: 'solid rgba(255, 255, 255, 0)',
      borderColor: 'rgba(255, 255, 255, 0)',
      borderWidth: 9,
      bottom: -18,
      borderTopColor: '#444',
      left: '1em',
      marginLeft: -9,
    },
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'inline-block',
  },
  listItem: {
    display: 'inline-block',
  },
};

export default injectSheet(styles)(Toolbar);
