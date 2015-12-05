import React from 'react';

export class Darkroom extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div ref="container" className="darkroom">
        {this.props.children}
      </div>
    );
  }
}

Darkroom.displayName = "Darkroom";

