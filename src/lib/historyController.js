import { createStore } from 'redux'

const initialState = {
  index: 0,
  threads: []
}
function historyReducer(state=initialState, action) {
  switch (action.type) {
    case 'GET_INDEX':
      return Object.assign({}, state, {
        index: action.index
      })
    case 'APPEND':
      return Object.assign({}, state, {
        todos: [
          ...state.threads,
          {
            index: state.threads.length
          }
        ]
      })
    default:
      return state
  }
}

export let historyController = createStore(historyReducer);
