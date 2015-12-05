import React from 'react';

export class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.getBitmapData = this.getBitmapData.bind(this);
    // private properties
    this._prevAngle = 0;
    this._data = null;
    this._cache = null;
  }

  // TODO - get getRotatedBoundingRect to work, so far it is too buggy for use.
  /*
   static getRotatedBoundingRect({width, height}, angle) {
   const { abs, sin, cos, PI } = Math;

   let radians = angle * PI / 180;

   return {
   width: abs(width * cos(radians) + height * sin(radians)),
   height: abs(width * sin(radians) + height * cos(radians))
   }

   }
   */


  /**
   * Constrain proportions to rect while considering its angle
   * @param from {{width: number, height: number}}
   * @param to {{width: number, height: number}}
   * @returns {{width: number, height: number}}
   */


  static constrainProportions (from, to) {

    let minRatio = Math.min(to.height / from.height, to.width / from.width);
    return {
      width: from.width  > to.width ? from.width  * minRatio : from.width,
      height: from.height > to.height ? from.height * minRatio : from.height
    }

  }
  static centerRect (rect, container) {
    return {
      x:  (container.width * 0.5)  - (rect.width  * 0.5),
      y: (container.height * 0.5)  - (rect.height * 0.5)
    }
  }
  static clearCanvas (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
  }
  static rotateImage (ctx, angle) {
    var canvas = ctx.canvas;
    if (angle !== this._prevAngle) {
      ctx.translate(canvas.width* .5, canvas.height* .5);
      ctx.rotate((angle) * Math.PI / 180);
      ctx.translate(-canvas.width*.5, -canvas.height*.5);
      this._prevAngle = angle;
    }
  }
  static renderImage (ctx, img, position, boundRect) {

    ctx.drawImage(img, position.x, position.y, boundRect.width, boundRect.height);

  }
  getBitmapData (source) {
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


  componentDidUpdate () {
    if (this.props.source) {
      let
        image = this.getBitmapData(this.props.source),
        canvas = this.refs.canvas,
        angle = parseInt(this.props.angle) || 0,
        boundRect = {
          width: parseInt(this.props.width),
          height: parseInt(this.props.height)
        },
        dims = {
          width: parseInt(image.width),
          height: parseInt(image.height)
        },
        ctx = canvas.getContext('2d');

      Canvas.clearCanvas(canvas, ctx);
      Canvas.rotateImage(ctx, angle);

      let scaledRect = Canvas.constrainProportions(dims, boundRect);
      let position = Canvas.centerRect(scaledRect, boundRect);

      ctx.clearRect(0, 0, boundRect.width, boundRect.height);

      Canvas.renderImage(ctx, image, position, scaledRect);

      ctx.restore();
    }


  }

  render () {

    let {width,height} = this.props;

    return (
      <div {...this.props} style={{width, height}} className="darkroom-canvas">
        <canvas ref="canvas" width={width} height={height} ref="canvas"/>
      </div>
    );
  }

}

