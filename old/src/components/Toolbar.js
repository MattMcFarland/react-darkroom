import React from 'react';

const toList = (node, index) => <li key={index}>{node}</li>;

export default ({children}) =>
  <menu>
    <ul>
      {React.Children.toArray(children).map(toList)}
    </ul>
  </menu>;
