import React from 'react';
import ReactDOM from 'react-dom';
import { Darkroom, Canvas, History } from './components';
import { historyController } from './lib/historyController';
import { File } from './elements';


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

  componentDidMount () {
    // Every time the state changes, log it
    this.unsubscribe = historyController.subscribe(() =>
      this.setState({history: (historyController.getState())})
    )
    this.setState({history: (historyController.getState())});
  }

  componentWillUnMount () {
    this.unsubscribe();
  }

  render () {

    let { angle, image } = this.state;

    let onUndo = () => {
      console.log('onUndo clicked');
    }
    let onRedo = () => {
      console.log('onRedo clicked');
    }

    return (
      <div>
        <Darkroom>
          <History controller={this.state.history}>
            <button
              action="back"
              onClick={onUndo}
              ifEmpty="disable"
              data-tipsy="Undo"
              className="tipsy tipsy--sw">
              <span className="icon icon-undo2"/>
            </button>
            <button
              action="forward"
              onClick={onRedo}
              ifEmpty="disable"
              data-tipsy="Redo"
              className="tipsy tipsy--sw">
              <span className="icon icon-redo2"/>
            </button>
          </History>
          <File onChange={this.onFileChange}/>
          <Canvas source={image} angle={angle} width="300" height="300"/>
        </Darkroom>
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

