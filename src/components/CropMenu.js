import React from 'react';
export default ({
  isCropping,
  children
  }) => {

  var
    childNodes = [];

  React.Children.forEach(children, child => {
    var { showOnlyWhen } = child.props;

    if (isCropping && showOnlyWhen === "croppingIsOn") {
      childNodes.push(child);
    } else if (!isCropping && showOnlyWhen === "croppingIsOff") {
      childNodes.push(child);
    }
  });

  return (
    <span>{childNodes}</span>
  );

};
