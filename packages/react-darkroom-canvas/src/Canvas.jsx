import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  pure,
  setDisplayName,
  withState,
  lifecycle,
} from 'recompose';
import generateUUID from 'uuid/v4';

/* global Image */

export const canvasElements = {};
export const Canvas = props => (
  <span>
    <canvas
      {...props}
      image={props.image}
      className={props.className}
      ref={(canvas) => { canvasElements[props.uuid] = canvas; }}
    />
  </span>
);

Canvas.propTypes = {
  className: PropTypes.string,
  /** @ignore */
  uuid: PropTypes.string,
  /** raw canvas image data */
  image: PropTypes.string,
};

export const flip = (canvas, src) => {
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(src, 0, 0);
  };
  img.src = src;
};

export default compose(
  pure,
  withState('uuid', 'setUUID', null),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      return nextProps.src !== this.props.src;
    },
    componentWillUpdate(nextProps) {
      flip(canvasElements[this.props.uuid], nextProps.src);
    },
    componentDidMount() {
      this.props.setUUID(generateUUID());
    },
    componentWillUnmount() {
      delete canvasElements[this.props.uuid];
    },
  }),
  setDisplayName('Canvas'),
)(Canvas);
