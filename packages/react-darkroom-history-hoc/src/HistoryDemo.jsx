import React from 'react'
import withHistory from './withHistory'

const HistoryDemo = ({
  counter,
  pushHistory,
  undo,
  redo,
  index,
  thread,
  onIncrement = () => pushHistory({counter: counter + 1}),
  onDecrement = () => pushHistory({counter: counter - 1})
}) => (
  <div>
    <h1>HistoryDemo</h1>
    <p><span>Count:</span><num>{counter}</num></p>
    <button onClick={onIncrement}>increment</button>
    <button onClick={onDecrement}>decrement</button>
    <hr/>
    <button disabled={index <= 0} onClick={() => undo()}>Undo</button>
    <button disabled={index >= thread.length-1} onClick={() => redo()}>Redo</button>
  </div>
)

const initialState = {
  counter: 1
}

export default withHistory(initialState)(HistoryDemo);