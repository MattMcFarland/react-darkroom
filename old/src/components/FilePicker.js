import React from 'react';

export default class FilePicker extends React.Component {
  render() {

    let {onChange, hasFile} = this.props;
    let btnStyle = {
      display: hasFile ? 'none' : 'block',
      width: '100%',
      background: 'inherit',
      border: 'inherit',
      color: '#bbb'
    };
    let iconStyle = {
      width: '100%',
      display: 'block',
      fontSize: '240px'
    };
    let textStyle = {
      fontSize: '34px'
    };

    return (
      <button style={btnStyle} onClick={() => this.refs.fileInput.click()} type="button" className="filepicker">
        <span style={iconStyle} className="icon icon-image"/>
        <span style={textStyle}>Select image</span>
        <input ref="fileInput" style={{display: 'none'}} type="file" onChange={onChange}/>
      </button>
    );
  }
}
