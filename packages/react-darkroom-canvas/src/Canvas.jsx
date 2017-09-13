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

export const Canvas = ({
  className,
  uuid,
  width,
  height,
  src,
  canvasProps,
}) =>
  (<canvas
    className={className}
    src={src}
    width={width}
    height={height}
    ref={(canvas) => { canvasElements[uuid] = canvas; }}
    {...canvasProps}
  />);

Canvas.propTypes = {
  /** css class applied to the `<canvas>` tag */
  className: PropTypes.string,
  /** @ignore */
  uuid: PropTypes.number,
  /** sets inner `<canvas>` width attribute */
  width: PropTypes.number,
  /** sets inner `<canvas>` height attribute */
  height: PropTypes.string,
  /** url of image to display in canvas, when changed, canvas immediately shows its contents. */  
  src: PropTypes.string,
  /** additional props or attributes you may apply to the `<canvas>` tag */
  canvasProps: PropTypes.object,
};

export default compose(
  pure,
  withState('uuid', 'setUUID', null),
  lifecycle({
    componentDidMount() {
      this.props.setUUID(generateUUID());
    },
    componentWillUnmount() {
      delete canvasElements[this.props.uuid];
    },
    componentWillUpdate(nextProps) {
      const canvas = canvasElements[this.props.uuid];
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = nextProps.src;
    },
  }),
  setDisplayName('Canvas'),
)(Canvas);
