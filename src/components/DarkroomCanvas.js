import BaseComponent from './BaseComponent';
import Utils from '../lib/Utils';
import React from 'react';
import { File } from '../elements';



export class DarkroomCanvas extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind(
      'updateCanvas'
    );
    this.state = {};
  }

  updateCanvas () {
    let
      { canvas, image } = this.refs,
      angle = parseInt(this.props.angle) || 0,
      boundRect = {
        width: parseInt(this.props.width),
        height: parseInt(this.props.height)
      },
      dims = Utils.getRotatedBoundingRect ({
        width: parseInt(image.width),
        height: parseInt(image.height)
      }, angle),
      ctx = canvas.getContext('2d');


    Utils.clearCanvas(canvas, ctx);
    Utils.rotateImage(ctx, angle);

    let scaledRect = Utils.constrainProportions(dims, boundRect);
    let position = Utils.centerRect(scaledRect, boundRect);
    console.log('Maximum Size', boundRect);
    console.log('Image Dimensions', dims);
    console.log('Scaled Dimensions', scaledRect);
    ctx.clearRect(0, 0, boundRect.width, boundRect.height);
    Utils.renderImage(ctx, image, position, scaledRect);
    ctx.restore();
  }


  componentDidUpdate (a, b) {
    setTimeout(this.updateCanvas, 100);
  }

  render () {

    let image = this.props.image,
      { width, height } = this.props,
      theStyle = {};

    if (width) {
      theStyle.width = this.props.width;
    }
    if (height) {
      theStyle.height = this.props.height;
    }


    return (
      <div ref="container" className="darkroom">
        <div style={theStyle} className="darkroom-editor">
          <img ref="image" src={image} />
          <canvas ref="canvas" width={width} height={height} ref="canvas"/>
        </div>
        <File onChange={this.props.onFileChange}/>
      </div>
    );
  }

}

DarkroomCanvas.defaultProps = {

};

DarkroomCanvas.propTypes = {

};

DarkroomCanvas.displayName = "DarkRoom";

