import * as actionsTypes from './types';

/* User Actions */
export const setUser = user => ({
  type: actionsTypes.SET_USER,
  payload: {
    currentUser: user,
  },
});

export const clearUser = () => ({
  type: actionsTypes.CLEAR_USER,
});


/* Room Actions */
export const setCurrentRoom = room => ({
  type: actionsTypes.SET_CURRENT_ROOM,
  payload: {
    currentRoom: room,
  },
});

export const clearRoom = () => ({
  type: actionsTypes.CLEAR_ROOM,
});
