const initialState = {
  image: null,
  angle: 0
}
export const canvasController = (state=initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FILE':
      return Object.assign({}, state, {
        image: action.image
      })
    case 'UPDATE_ANGLE':
      return Object.assign({}, state, {
        angle: action.angle
      })
    default:
      return state
  }
}
