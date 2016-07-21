/**
 * Darkroom Kitchen Sink
 * A bit overkill but use-able
 */

import { Darkroom, Canvas, History, Toolbar, FilePicker, CropMenu } from '../components';
import { Transform } from '../utils';
import React from 'react';

const canvasWidth = 300;
const canvasHeight = 300;

function fileController(thread = {source: null}, action) {
  switch (action.type) {
    case 'SET_FILE':
      return Object.assign({}, thread, {
        source: action.file,
        angle: 0
      });
    default:
      return thread;
  }
}
function imageController(thread = {crop: false, source: null, angle: 0}, action) {
  switch (action.type) {
    case 'ROTATE_LEFT':
      return Object.assign({}, thread, {
        angle: thread.angle + 90
      });
    case 'ROTATE_RIGHT':
      return Object.assign({}, thread, {
        angle: thread.angle - 90
      });
    case 'START_CROPPING':
      return Object.assign({}, thread, {
        crop: true
      });
    case 'STOP_CROPPING':
      return Object.assign({}, thread, {
        crop: false
      });
    case 'CONFIRM_CROP':
      return Object.assign({}, thread, {
        crop: false,
        source: action.image
      });
    default:
      return thread;
  }
}
function readFile(file, done) {
  var reader = new FileReader();
  reader.onload = e => done(e.target.result);
  reader.readAsDataURL(file);
}

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

export default class KitchenSink extends React.Component {

  constructor(props) {
    super(props);
    this.state = { step: 0, thread: [{crop: false, source: null, angle: 0}] };
    ['onFileChange',
      'update',
      'onRedo',
      'onUndo',
      'onRotateLeft',
      'onCropStart',
      'onCropConfirm',
      'onCropCancel',
      'onRotateRight'].forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  componentDidUpdate() {
    console.timeEnd('State changed');
  }
  update(action) {
    const state = this.state;
    let nextThread;
    let nextStep = state.thread.length;
    let newState;
    let newThread;

    switch (action.type) {
      case "SET_FILE":
        nextThread = fileController(state.thread[state.step], action);
        break;

      case "UNDO":
        nextStep = state.step - 1;
        break;

      case "REDO":
        nextStep = state.step + 1;
        break;

      case "ROTATE_LEFT":
      case "ROTATE_RIGHT":
      case "START_CROPPING":
      case "STOP_CROPPING":
      case "CONFIRM_CROP":
        nextThread = imageController(state.thread[state.step], action);
        break;

    }

    if ((action.type !== "UNDO" && action.type !== "REDO") &&
    (state.step > 0 && state.step < state.thread.length - 1)) {
      newThread = [
        ...state.thread.slice(0, state.step),
        nextThread
      ];
      nextStep = newThread.length - 1;
    } else {
      newThread = nextThread ? [...state.thread, nextThread ] : [].concat(state.thread);
    }

    newState = Object.assign({}, state, {
      step: nextStep,
      thread: newThread
    });
    console.time('State changed');
    this.setState(newState);

  }

  onFileChange(e) {

    readFile(e.target.files[0], file => {
      this.update({type: 'SET_FILE', file });
    });
  }

  onUndo() {
    this.update({type: 'UNDO'});
  }

  onRedo() {
    this.update({type: 'REDO'});
  }

  onRotateLeft() {
    this.update({type: 'ROTATE_LEFT'});
  }

  onRotateRight() {
    this.update({type: 'ROTATE_RIGHT'});
  }

  onCropStart() {
    this.update({type: 'START_CROPPING'});
  }

  onCropCancel() {
    this.update({type: 'STOP_CROPPING'});
  }

  onCropConfirm() {

    let { source } = this.state.thread[this.state.step];
    let { x, y, width, height } = this.refs.canvasWrapper.cropBox;

    let newImage = Transform.cropImage(source, {x, y, width, height}, { width: canvasWidth, height: canvasHeight })
      .then(image => this.update({ type: 'CONFIRM_CROP', image }));


  }

  render() {
    let current = this.state.thread[this.state.step];
    let { angle, source, crop } = current;
    let hasFile = source !== null;

    let selectFile = () => {
      this.refs.fileselect.click();
    };


    return (
      <div style={{padding: "0 1em"}}>
        <header>
          <h2>React Darkroom Kitchen Sink v0.3.5</h2>
          <a href="https://github.com/MattMcFarland/react-darkroom">
            https://github.com/MattMcFarland/react-darkroom
          </a>
          <hr/>
        </header>
        <div style={{padding: "1em"}}>
          <Darkroom>
            <Toolbar>
              <button onClick={selectFile} data-tipsy="Select Image" className="tipsy tipsy--s">
                <span className="icon icon-image"/>
                <input type="file" ref="fileselect" onChange={this.onFileChange} style={{display: 'none'}}/>
              </button>
              <History step={this.state.step} length={this.state.thread.length - 1}>
                <button
                  action="back"
                  onClick={this.onUndo}
                  data-ifEmpty="disable"
                  data-tipsy="Undo"
                  className="tipsy tipsy--sw">
                  <span className="icon icon-undo2"/>
                </button>
                <button
                  action="forward"
                  onClick={this.onRedo}
                  data-ifEmpty="disable"
                  data-tipsy="Redo"
                  className="tipsy tipsy--sw">
                  <span className="icon icon-redo2"/>
                </button>
              </History>
              <button
                disabled={!hasFile}
                onClick={this.onRotateLeft}
                data-tipsy="Rotate Left"
                className="tipsy tipsy--sw">
                <span className="icon icon-undo"/>
              </button>
              <button
                disabled={!hasFile}
                onClick={this.onRotateRight}
                data-tipsy="Rotate Right"
                className="tipsy tipsy--sw">
                <span className="icon icon-redo"/>
              </button>
              <CropMenu isCropping={crop}>
                <button
                  disabled={!hasFile}
                  data-showOnlyWhen='croppingIsOff'
                  onClick={this.onCropStart}
                  data-tipsy="Crop"
                  className="tipsy tipsy--sw">
                  <span className="icon icon-crop"/>
                </button>
                <button disabled={!hasFile} showOnlyWhen='croppingIsOn' style={{color: 'cyan'}}>
                  <span className="icon icon-crop"/>
                </button>
                <button
                  disabled={!hasFile}
                  data-showOnlyWhen='croppingIsOn'
                  onClick={this.onCropConfirm}
                  style={{color: 'green'}}
                  data-tipsy="Confirm"
                  className="tipsy tipsy--sw">
                  <span className="icon icon-checkmark"/>
                </button>
                <button
                  disabled={!hasFile}
                  data-showOnlyWhen='croppingIsOn'
                  onClick={this.onCropCancel}
                  style={{color: 'red'}}
                  data-tipsy="Cancel"
                  className="tipsy tipsy--sw">
                  <span className="icon icon-cross"/>
                </button>
              </CropMenu>
              <button disabled={!hasFile} onClick={this.onSave} data-tipsy="Save" className="tipsy tipsy--sw">
                <span className="icon icon-floppy-disk"/>
              </button>
            </Toolbar>
            <Canvas
              ref="canvasWrapper"
              crop={crop}
              source={source}
              angle={angle}
              width={canvasWidth}
              height={canvasHeight}>
              <FilePicker hasFile={hasFile} onChange={this.onFileChange}/>
            </Canvas>
          </Darkroom>
        </div>
      </div>
    );
  }
}
