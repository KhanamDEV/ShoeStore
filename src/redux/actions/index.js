import {SIGN_IN, UPDATE_USER, LOGOUT} from './type';

export const signIn = (user) => {
  return {
    type: SIGN_IN,
    payload: user,
  };
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
