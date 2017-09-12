#### withHistory(`initialState`)(`Component`)
Use `withHistory` to apply helper functions and props to your components. 

The components wrapped will then be supplied with the following props:
- `pushHistory` *function* which works similar to `setState` but it adds it to an internal thread
- `thread` *array* which contains all of the states in history
- `index` *number* which indicates at which part of the thread index will be applied to props
- `undo` *function* which will move the index backward
- `redo` *function* which will move the index forward

The component `props` are automatically updated to reflect the contents within the current `index` in the `thread`

```js
/*
import withHistory from 'react-darkroom-history-hoc'
*/
const withHistory = require('./withHistory').default
const ComponentToWrap = ({
  counter,
  pushHistory,
  undo,
  redo,
  index,
  thread,
}) => (
  <div>
    <h1>HistoryDemo</h1>
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

const WrappedComponent = withHistory(initialState)(ComponentToWrap);

<WrappedComponent counter={1}/>
```
