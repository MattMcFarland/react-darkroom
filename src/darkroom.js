import React from 'react';
import {Toolbar, File } from './elements/index';
import Mig from './lib/Mig';


class DarkRoom extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {

  }
  onChange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e => this.setState({image: e.target.result, angle: 0}) );
    reader.readAsDataURL(file);
  };

  onRotateLeft = () => this.setState({angle: this.state.angle -= 90});

  onRotateRight = () => this.setState({angle: this.state.angle += 90});

  clearCanvas = (canvas, ctx) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
  };
  updateCanvas = () => {
    let {canvas, image} = this.refs;
    let ctx = canvas.getContext('2d');
    this.clearCanvas(canvas, ctx);
    if (this.state.angle) {
      Mig.rotateImage(ctx, this.state.angle);
    }
    Mig.renderImage(ctx, image);
  };
  componentDidUpdate () {
    if (this.state.image) {
      setTimeout(this.updateCanvas, 100);
    }
  }

  render () {
    return (
      <div className="darkroom">
        {this.state && this.state.image ?
          <div className="darkroom-editor">
            <Toolbar onRotateLeft={this.onRotateLeft} onRotateRight={this.onRotateRight}/>
            <img ref="image" src={this.state.image} />
            <canvas ref="canvas"/>
          </div> :
          <File onChange={this.onChange}/> }
      </div>
    );
  }

}

DarkRoom.defaultProps = {

};

DarkRoom.propTypes = {

};

DarkRoom.displayName = "DarkRoom";

export default DarkRoom;
