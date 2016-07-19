import React from 'react';
import { Transform, CropBox } from '../utils';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.getBitmapData = this.getBitmapData.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
    // private properties
    this._prevAngle = 0;
    this._data = null;
    this._cache = null;
  }

  /**
   * Constrain proportions to rect while considering its angle
   * @param from {{width: number, height: number}}
   * @param to {{width: number, height: number}}
   * @returns {{width: number, height: number}}
   */
  getBitmapData(source) {
    try {
      if (source !== this._data) {
        this._cache = new Image();
        this._data = Object.assign(source);
        this._cache.src = this._data;
      }
      return this._cache;
    } catch (er) {
      this._cache = null;
      this._data = null;
      this._cache.src = null;
      return null;
    }
  }

  renderCanvas() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = this.props.width;
    canvas.height = this.props.height;
    if (this.cache) {
      canvas = this.refs.canvas;
      ctx = canvas.getContext('2d');
      Transform.clearCanvas(canvas, ctx);
      ctx.drawImage(this.cache, 0,0);
      if (this.props.crop) {
        if (!this.cropBox) {
          this.cropBox = new CropBox({canvas, ctx});
        }
        this.cropBox.render();
      }
    }
    if (this.props.source && !this.cache) {
      let image = this.getBitmapData(this.props.source);
      let angle = parseInt(this.props.angle) || 0;
      let boundRect = {
        width: parseInt(this.props.width),
        height: parseInt(this.props.height)
      };
      let dims = {
        width: parseInt(image.width),
        height: parseInt(image.height)
      };

      Transform.rotateImage(ctx, angle);

      let scaledRect = Transform.constrainProportions(dims, boundRect);
      let position = Transform.centerRect(scaledRect, boundRect);

      Transform.renderImage(ctx, image, position, scaledRect);
      setTimeout(() => {
        let img = new Image();
        img.src = canvas.toDataURL("image/png");
        this.cache = img;
      }, 100);


    }
  }

  componentDidMount() {
    setInterval(() => {
      this.renderCanvas();
    }, 30);
  }
  componentWillUpdate() {
    this.cache = null;
  }
  render() {

    let {source, width, height, children} = this.props;


    let canvasStyle = {
      display: source ? 'block' : 'none'
    };


    return (
      <div style={{width, height}} className="darkroom-canvas">
        {children}
        <canvas style={canvasStyle} ref="canvas" width={width} height={height} />
      </div>
    );
  }

}
