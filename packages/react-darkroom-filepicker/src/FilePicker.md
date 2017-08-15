### FilePicker Basics

FilePicker is used primarily to handle the operation of loading a file into memory.  It allows
full customization, and by default it looks intentionally plain.

    <FilePicker fileDataLoaded={ ({meta}) =>       
      setState({meta})
    }>
      <span style={{ color: 'red' }}>Click me...</span>
      <pre>
        {state.meta && JSON.stringify(state, null, 2)}
      </pre>
    </FilePicker>

### Customize appearance

You can customize the filepicker's appearance by either providing a your own `className` prop to it, or by providing your own children.  

#### Custom class Example

    <FilePicker className="button" fileDataLoaded={(file) => setState({file})}>
      <span>Upload file...</span>
      <pre>
        {state.file && JSON.stringify(state.file.meta, null, 2)}
      </pre>      
    </FilePicker>

#### Toolbar Example

    <Toolbar>
      <ToolbarButton>
        <FilePicker fileDataLoaded={({data, meta}) => 
          setState({ 
            meta,
            truncated_data: data.substring(0, 40) })
          }>
          Upload file...
        </FilePicker>
      </ToolbarButton>
    </Toolbar>