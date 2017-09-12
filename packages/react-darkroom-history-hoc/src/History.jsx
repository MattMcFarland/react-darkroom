import React from 'react';
import withHistory from './withHistory';

const History = ({
  /* eslint react/prop-types: 0 */
  counter,
  pushHistory,
  undo,
  redo,
  index,
  thread,
}) => (
  <div>
    <h1>History</h1>
    <p><span>Count:</span><num>{counter}</num></p>
    <button onClick={() => pushHistory({ counter: counter + 1 })}>increment</button>
    <button onClick={() => pushHistory({ counter: counter - 1 })}>decrement</button>
    <hr />
    <button disabled={index <= 0} onClick={undo}>Undo</button>
    <button disabled={index >= thread.length - 1} onClick={redo}>Redo</button>
  </div>
);

const initialState = {
  counter: 1,
};

export default withHistory(initialState)(History);
