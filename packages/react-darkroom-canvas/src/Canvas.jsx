import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Transform,
  CropBox,
} from './utils';

const EMPTY_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.originalImage = new window.Image();
    this.state.originalImage.src = props.src;
    this.state.cache = new window.Image();
    this.state.cache.src = props.src;
    Transform.loadBitmapData(props.src).then((image) => {
      this.setState({ cache: image });
    }).catch(console.error);
  }

  componentWillUpdate(nextProps) {
    if (!this.canvas) return;
    const canvasSize = {
      width: nextProps.width,
      height: nextProps.height,
    };
    const imageSize = {
      width: this.state.cache.width,
      height: this.state.cache.height,
    };
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    Transform.clearCanvas(this.canvas, ctx);
    Transform.rotateImage(ctx, nextProps.angle);

    const scaledSize = Transform.constrainProportions(imageSize, canvasSize);
    const position = Transform.centerRect(scaledSize, canvasSize);

    Transform.renderImage(ctx, this.state.cache, position, scaledSize);
  }

  render() {
    return (<canvas
      width={this.props.width}
      height={this.props.height}
      src={this.props.src}
      ref={(canvas) => { this.canvas = canvas; }}
    />);
  }
}

Canvas.defaultProps = {
  width: 0,
  height: 0,
  angle: 0,
  src: EMPTY_GIF,
};

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  angle: PropTypes.number,
  src: PropTypes.string,
};

export default Canvas;
