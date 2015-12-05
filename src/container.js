import React from 'react';
import ReactDOM from 'react-dom';
import { DarkroomCanvas} from './components';

/**
 * Darkroom API methods
 *
 * Set image/width/height
 * Set Rotation
 * Use React.Children.foreach can iterate through each item
 * for a declarative API
 * Image rotation -> Should that be state?  Or should we set that
 * independantly and allow for image rotation to be easily set?
 *
 * Controls to be a separate and optional component for maximum
 * re-usability.
 */

class DarkroomContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
      image: null
    }
    this.onFileChange = this.onFileChange.bind(this);
  }
  onFileChange (e) {
    var reader = new FileReader();
    reader.onload = (e => this.setState({image: e.target.result, angle: 0}) );
    reader.readAsDataURL(e.target.files[0]);
  }

  render () {

    let { angle, image } = this.state;

    return (
      <div>
        <DarkroomCanvas image={image} onFileChange={this.onFileChange} angle={angle} width="300" height="300"/>
      </div>
    )
  }


}

ReactDOM.render(
  <div>
    <h2>Darkroom test</h2>
    <div style={{padding: "2em"}}>
      <DarkroomContainer/>
    </div>
  </div>
  , document.getElementById('index'));

