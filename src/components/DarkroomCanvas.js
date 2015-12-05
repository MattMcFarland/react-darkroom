import BaseComponent from './BaseComponent';
import Utils from '../lib/Utils';
import React from 'react';

export class DarkroomCanvas extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind(
      'readFile'
    );
  }

  readFile (file) {
    var reader = new FileReader();
    reader.onload = (e => this.setState({_image: e.target.result, angle: 0}) );
    reader.readAsDataURL(file);
  }

  updateCanvas () {
    let {canvas, image} = this.refs;
    let ctx = canvas.getContext('2d');
    Utils.clearCanvas(canvas, ctx);
    if (this.props.angle) {
      Utils.rotateImage(ctx, this.props.angle);
    }
    Utils.renderImage(ctx, image);
  }


  componentDidUpdate () {
    if (this.state._image) {
      setTimeout(this.updateCanvas, 100);
    }
  }

  get image () {
    // If image is passed in by prop it will take precedent. Otherwise
    // internal _image will be used
    if (this.props.image) {
      return this.props.image
    } else if (this.state && this.state._image) {
      return this.state._image;
    } else {
      return undefined;
    }
  }

  render () {

    let image = this.image,
      { width, height } = this.props,
      theStyle = {};

    if (width) {
      theStyle.width = this.props.width;
    }
    if (height) {
      theStyle.height = this.props.height;
    }

    if (this.props.file) {
      setTimeout (this.readFile(this.props.file), 100);
    }

    return (
      <div className="darkroom">
        <div style={theStyle} className="darkroom-editor">
          <img ref="image" src={image} />
          <canvas ref="canvas"/>
        </div>
      </div>
    );
  }

}

DarkroomCanvas.defaultProps = {

};

DarkroomCanvas.propTypes = {

};

DarkroomCanvas.displayName = "DarkRoom";

