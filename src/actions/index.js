import * as actionsTypes from './types';

/* User Actions */
export const setUser = user => ({
  type: actionsTypes.SET_USER,
  payload: {
    currentUser: user,
  },
});
