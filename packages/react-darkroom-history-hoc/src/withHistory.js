    import { withStateHandlers } from 'recompose'

    export default (initialState) => withStateHandlers({ thread: [initialState], index: 0, ...initialState }, {
      pushHistory: (state, props) => newState => updateThread(state, newState),
      go: (state, props) => n => moveIndex(state, n),
      forward: (state, props) => () => moveIndex(state, 1),
      backward: (state, props) => () => moveIndex(state, -1),
      undo: (state, props) => () => moveIndex(state, -1),
      redo: (state, props) => () => moveIndex(state, 1)
    })

    export function updateThread (state, newState) {
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

    export function moveIndex (state, moveBy) {
      const targetIndex = clamp(state.index + moveBy, 0, state.thread.length - 1)
      return {
        index: targetIndex,
        thread: state.thread,
        ...state.thread[targetIndex]
      }
    }

    export function clamp (num, min, max) {
      return num <= min ? min : num >= max ? max : num;
    }

