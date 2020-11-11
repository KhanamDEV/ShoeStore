import {LOGOUT, SIGN_IN, UPDATE_USER} from '../actions/type';

const initState = {
  status: false,
  token: '',
  user: {
    name: '',
    email: '',
    id: '',
  },
};

export default function (state = initState, action) {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        status: false,
      };
    }
    default:
      return state;
  }
}
