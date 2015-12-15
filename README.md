React-Darkroom component

Inspired by https://mattketmo.github.io/darkroomjs/


## View example

Clone the github project first.

```
npm install && npm start
```

## Usage

To use, install via npm first.

```
npm install react-darkroom --save
```

Once installed, you can access the different parts of react-darkroom as follows:

```
import { Darkroom, Canvas, History, Toolbar, FilePicker, CropMenu } from 'react-darkroom';
```

react-darkroom was built using composition, so it can be modified more easily.  However this increases the amount of steps
necessary to render the component.

## State

Component state is managed by you, and each of the different sub-components that react-component comes with are considered
"dumb" components, so you have to explicitly define and update each component.


```jsx

<Darkroom>
  <Toolbar>
    <button onClick={selectFile} data-tipsy="Select Image" className="tipsy tipsy--s">
      <span className="icon icon-image"/>
      <input type="file" ref="fileselect" onChange={this.onFileChange} style={{display: 'none'}}/>
    </button>
    <History step={this.state.step} length={this.state.thread.length-1}>
      <button
        action="back"
        onClick={this.onUndo}
        ifEmpty="disable"
        data-tipsy="Undo"
        className="tipsy tipsy--sw">
        <span className="icon icon-undo2"/>
      </button>
      <button
        action="forward"
        onClick={this.onRedo}
        ifEmpty="disable"
        data-tipsy="Redo"
        className="tipsy tipsy--sw">
        <span className="icon icon-redo2"/>
      </button>
    </History>
    <button disabled={!hasFile} onClick={this.onRotateLeft} data-tipsy="Rotate Left" className="tipsy tipsy--sw">
      <span className="icon icon-undo"/>
    </button>
    <button disabled={!hasFile} onClick={this.onRotateRight} data-tipsy="Rotate Right" className="tipsy tipsy--sw">
      <span className="icon icon-redo"/>
    </button>
    <CropMenu isCropping={crop}>
      <button disabled={!hasFile} showOnlyWhen='croppingIsOff' onClick={this.onCropStart} data-tipsy="Crop" className="tipsy tipsy--sw">
        <span className="icon icon-crop"/>
      </button>
      <button disabled={!hasFile} showOnlyWhen='croppingIsOn' style={{color: 'cyan'}}>
        <span className="icon icon-crop"/>
      </button>
      <button disabled={!hasFile} showOnlyWhen='croppingIsOn' onClick={this.onCropConfirm} style={{color: 'green'}} data-tipsy="Confirm" className="tipsy tipsy--sw">
        <span className="icon icon-checkmark"/>
      </button>
      <button disabled={!hasFile} showOnlyWhen='croppingIsOn' onClick={this.onCropCancel} style={{color: 'red'}} data-tipsy="Cancel" className="tipsy tipsy--sw">
        <span className="icon icon-cross"/>
      </button>
    </CropMenu>
    <button disabled={!hasFile} onClick={this.onSave} data-tipsy="Save" className="tipsy tipsy--sw">
      <span className="icon icon-floppy-disk"/>
    </button>
  </Toolbar>
  <Canvas ref="canvasWrapper" crop={crop} source={source} angle={angle} width={canvasWidth} height={canvasHeight}>
    <FilePicker hasFile={hasFile} onChange={this.onFileChange}/>
  </Canvas>
</Darkroom>

```

