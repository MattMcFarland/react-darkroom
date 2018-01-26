import React from 'react';

const History = ({
  step, length,
  children
  }) => {

  let backButton;
  let fwdButton;
  let childNodes = [];

  React.Children.forEach(children, child => {
    const ifEmpty = child.props['data-ifempty'];
    const action = child.props.action;
    if (action === "back") {

      backButton = (
        <button
          disabled={step === 0 && ifEmpty === "disable"}
          style={{display: step === 0 && ifEmpty === "hide" ? 'none' : 'inherit'}}
          {...child.props}
        />);
      childNodes.push(backButton);
    } else if (action === "forward") {
      fwdButton = (
        <button
          disabled={step === (length) && ifEmpty === "disable"}
          style={{display: step === (length) && ifEmpty === "hide" ? 'none' : 'inherit'}}
          {...child.props}
        />);
      childNodes.push(fwdButton);
    } else {
      childNodes.push(child);
    }
  });

  return (
    <span>
      {childNodes.map((childNode, index) => {
        return (<span key={index}>{childNode}</span>);
      })}
    </span>
  );
};

export default History;
