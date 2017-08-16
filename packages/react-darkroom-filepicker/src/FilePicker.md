### FilePicker Basics

FilePicker is used primarily to handle the operation of loading a file into memory.  It does **not** use a `<button>` tag, so you may want to add your own but don't use the `onClick` handler, as the onclick is listened at the root of this component.  This allows you to place a button of your own styling inside, as it catches the click event which bubbles up.  To function, FilePicker *only* needs `fileDataLoaded` prop defined.

    <FilePicker fileDataLoaded={ ({meta}) => setState({meta}) }>
      <button>Click me to add file</button>
      <pre>{state.meta && JSON.stringify(state, null, 2)}</pre>
    </FilePicker>

### Custom appearance

Even if your button is placed nested deeep within the <Filepicker> component, the `onClick` event bubbles up to the `FilePicker` container, which handles it, and then returns the data to the handler `fileDataLoaded`

      <div>
        <Toolbar>
          <FilePicker fileDataLoaded={ ({meta}) => setState({meta}) }>
            <Tooltip label="Upload file...">
              <ToolbarButton>          
                <Icon kind="floppyDisk"/>
              </ToolbarButton>
            </Tooltip>
          </FilePicker>          
        </Toolbar>
        <pre>
          {state.meta && JSON.stringify(state, null, 2)}
        </pre>
      </div>
    