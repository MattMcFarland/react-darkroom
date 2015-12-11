import React from 'react';

export default ({
  children
  }) => {

  var
    childNodes = [];

  React.Children.forEach(children, child => {
    childNodes.push(child);
  });

  return (
    <menu>
      <ul>
        {childNodes.map((childNode, index) => {
          return (<li key={index}>{childNode}</li>)
        })}
      </ul>
    </menu>
  );
};
