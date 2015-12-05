import React from 'react';

export default ({
  onUndo,
  onRedo,
  onRotateLeft,
  onRotateRight,
  onCrop,
  onSave
}) => (<menu>

  <ul>
    <li>
      <button onClick={onUndo} data-tipsy="Undo" className="tipsy tipsy--sw">
        <span className="icon icon-undo2"/>
      </button>
    </li>

    <li>
      <button onClick={onRedo} data-tipsy="Redo" className="tipsy tipsy--sw">
        <span className="icon icon-redo2"/>
      </button>
    </li>

    <li>
      <button onClick={onRotateLeft} data-tipsy="Rotate Left" className="tipsy tipsy--sw">
        <span className="icon icon-undo"/>
      </button>
    </li>

    <li>
      <button onClick={onRotateRight} data-tipsy="Rotate Right" className="tipsy tipsy--sw">
        <span className="icon icon-redo"/>
      </button>
    </li>

    <li>
      <button onClick={onCrop} data-tipsy="Crop" className="tipsy tipsy--sw">
        <span className="icon icon-crop"/>
      </button>
    </li>

    <li>
      <button onClick={onSave} data-tipsy="Save" className="tipsy tipsy--sw">
        <span className="icon icon-floppy-disk"/>
      </button>
    </li>

  </ul>
</menu>);
