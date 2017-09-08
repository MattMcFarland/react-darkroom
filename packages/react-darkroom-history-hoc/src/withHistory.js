import { withStateHandlers } from 'recompose';
/* eslint no-nested-ternary: 0 */
const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);

const updateThread = (state, newState) => {
  const newThread = [
    ...state.thread.slice(0, state.index + 1),
    newState,
  ];
  const updateIndex = newThread.length - 1;
  return {
    index: updateIndex,
    thread: newThread,
    ...newThread[updateIndex],
  };
};

const moveIndex = (state, moveBy) => {
  const targetIndex = clamp(state.index + moveBy, 0, state.thread.length - 1);
  return {
    index: targetIndex,
    thread: state.thread,
    ...state.thread[targetIndex],
  };
};

export default initialState => withStateHandlers({
  thread: [initialState], index: 0, ...initialState }, {
  pushHistory: state => newState => updateThread(state, newState),
  go: state => n => moveIndex(state, n),
  forward: state => () => moveIndex(state, 1),
  backward: state => () => moveIndex(state, -1),
  undo: state => () => moveIndex(state, -1),
  redo: state => () => moveIndex(state, 1),
});
