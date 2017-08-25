import {
  compose,
  withStateHandlers
} from 'recompose'

function _updateThread (state, newState) {
  const updateThread = [
    ...state.thread.slice(0, state.index + 1),
    newState
  ];
  const updateIndex = updateThread.length - 1
  return {
    index: updateIndex,
    thread: updateThread,
    ...updateThread[updateIndex]
  }
}

function _moveIndex (state, moveBy) {
  const targetIndex = clamp(state.index + moveBy, 0, state.thread.length - 1)
  return {
    index: targetIndex,
    thread: state.thread,
    ...state.thread[targetIndex]
  }
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function withHistory (state) { return compose(
  withStateHandlers({ thread: [state], index: 0, ...state }, {
    pushHistory: (state, props) => newState => _updateThread(state, newState),
    go: (state, props) => i => _moveIndex(state, i),
    forward: (state, props) => () => _moveIndex(state, 1),
    backward: (state, props) => () => _moveIndex(state, -1),
    undo: (state, props) => () => _moveIndex(state, -1),
    redo: (state, props) => () => _moveIndex(state, 1)
  })
)}

export default withHistory
