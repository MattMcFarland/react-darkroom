const initialState = {
  index: 0,
  threads: []
}
export const historyController = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_INDEX':
      return Object.assign({}, state, {
        index: action.index
      })
    case 'APPEND_HISTORY':
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
