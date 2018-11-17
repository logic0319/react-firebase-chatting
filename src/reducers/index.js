import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
  currentUser: null,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
  case actionTypes.SET_USER:
    return {
      currentUser: action.payload.currentUser,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
