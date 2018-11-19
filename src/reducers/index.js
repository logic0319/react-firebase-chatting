import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
  currentUser: null,
  isLoading: true,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
  case actionTypes.SET_USER:
    return {
      currentUser: action.payload.currentUser,
      isLoading: false,
    };
  case actionTypes.CLEAR_USER:
    return {
      ...initialUserState,
      isLoading: false,
    };
  default:
    return state;
  }
};

const initialRoomState = {
  currentRoom: null,
};

const roomReducer = (state = initialRoomState, action) => {
  switch (action.type) {
  case actionTypes.SET_CURRENT_ROOM:
    return {
      ...state,
      currentRoom: action.payload.currentRoom,
    };
  case actionTypes.CLEAR_ROOM:
    return {
      ...initialRoomState,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
});

export default rootReducer;
