import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Darkroom, Canvas, History } from './components';
import { darkRoomController } from './lib';
import { File } from './elements';



const updateFile = file => ({
  type: 'UPDATE_FILE',
  image: file
});


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
    var dispatch = this.props.dispatch;
    var reader = new FileReader();
    reader.onload = e => dispatch(updateFile(e.target.result));
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
    const { dispatch, angle, image, history } = this.props;

    let onUndo = () => {
      console.log('onUndo clicked');
    }
    let onRedo = () => {
      console.log('onRedo clicked');
    }

    return (
      <div>
        <h2>Darkroom test</h2>
        <div style={{padding: "2em"}}>
          <Darkroom>
            <History controller={history}>
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
      </div>
    )
  }
}


let reduxStore = createStore(darkRoomController);
ReactDOM.render(
  <Provider store={reduxStore}>
    <DarkroomContainer/>
  </Provider>
  , document.getElementById('index'));

