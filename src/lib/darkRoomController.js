import { canvasController, historyController} from './index'
import { combineReducers } from 'redux'

export const darkRoomController = combineReducers({
  canvasController,
  historyController
});
