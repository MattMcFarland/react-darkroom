import React from 'react';

export default ({isCropping, children}) =>
  <span>
    {
      React.Children.map(children, child => {
        const showOnlyWhen = child.props['data-showonlywhen'];

        if (isCropping && showOnlyWhen === "croppingIsOn") {
          return child;
        } else if (!isCropping && showOnlyWhen === "croppingIsOff") {
          return child;
        }
      })
    }
  </span>;
