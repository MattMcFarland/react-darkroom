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
    this.onFileChange = this.onFileChange.bind(this);
  }
  onFileChange (e) {
    this.setState({file: e.target.files[0]});
  }

  render () {
    let file = (this.state && this.state.file) ? this.state.file : null;
    return (
      <div>
        <DarkroomCanvas file={file} width="500" height="500"/>
        <input type="file" onChange={this.onFileChange}/>
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

