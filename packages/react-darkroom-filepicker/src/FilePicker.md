### FilePicker Basics

FilePicker is used primarily to handle the operation of loading a file into memory.  It allows
full customization, and by default it looks intentionally plain.

    <FilePicker fileDataLoaded={ ({meta}) => {
      console.log('container 1')
      setState({meta})
    }}>
      <span style={{ color: 'red' }}>Click me...</span>
      <pre>
        {state.meta && JSON.stringify(state, null, 2)}
      </pre>
    </FilePicker>

### Customize appearance

You can customize the filepicker's appearance by either providing a your own `className` prop to it, or by providing your own children.  

#### Custom class 

    <FilePicker fileDataLoaded={ ({meta}) =>       
      setState({meta2: meta})
    }>
      <span style={{ color: 'red' }}>Click me...</span>
      <pre>
        {state.meta2 && JSON.stringify(state, null, 2)}
      </pre>
    </FilePicker>