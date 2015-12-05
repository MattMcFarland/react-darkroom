import React from 'react';

const onEmpty = (setting) => {
  switch (setting) {
    case "disabled":
      break;
    case "hidden":
      break;
  }
}

export const History = ({
  controller,
  children
  }) => {

  var
    backButton,
    fwdButton,
    childNodes = [];

  React.Children.forEach(children, child => {
    var { ifEmpty, action } = child.props;

    if (controller && controller.index > -1) {
      let { threads, index } = controller;
      if (action === "back") {
        console.log(index, threads.length, ifEmpty);
        backButton = (
          <button
            disabled={index === 0 && ifEmpty === "disable"}
            style={{display: index === 0 && ifEmpty === "hide" ? 'none': 'inherit'}}
            {...child.props}
          />);
        childNodes.push(backButton);
      } else if (action === "forward") {
        fwdButton = (
          <button
            disabled={index === (threads.length) && ifEmpty === "disable"}
            style={{display: index === (threads.length) && ifEmpty === "hide" ? 'none': 'inherit'}}
            {...child.props}
          />);
        childNodes.push(fwdButton);
      } else {
        childNodes.push(child);
      }
    } else {
      childNodes.push(child);
    }
  });

  return (
    <span>
      {childNodes.map((childNode, index) => {
        return (<span key={index}>{childNode}</span>)
      })}
    </span>
  );
};
