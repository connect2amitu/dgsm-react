// import { Map } from 'immutable';
import { GLOBAL, JWT_SECRET } from '../shared/constants'
import jwt from 'jsonwebtoken'

var isDark = JSON.parse(localStorage.getItem("theme")) ? true : false
var user = localStorage.getItem('token') ? localStorage.getItem('token') : "";
var decodedUser = {};
var isLoggedIn = false;

if (user) {
  try {
    decodedUser = jwt.verify(user, JWT_SECRET);
    isLoggedIn = Object.keys(decodedUser).length > 0 ? true : false;
  } catch (error) {
    isLoggedIn = false;
  }
}
const initialState = {
  isDark,
  user: decodedUser,
  isLoggedIn,
  isLoading: false
};

const actionsMap = {
  [GLOBAL.CHANGE_THEME]: (state, action) => {
    localStorage.setItem('theme', !state.isDark)
    return {
      ...state,
      isDark: !state.isDark,
    }
  },
  [GLOBAL.AUTH_USER_START]: (state, action) => {
    return {
      ...state,
      // user: action.payload,
      isLoading: true
    }
  },
  [GLOBAL.AUTH_USER_SUCCESS]: (state, action) => {
    localStorage.setItem('token', action.data.token)
    return {
      ...state,
      user: jwt.decode(action.data.token, JWT_SECRET),
      isLoggedIn: true,
      isLoading: false
    }
  },
  [GLOBAL.AUTH_USER_ERROR]: (state, action) => {
    localStorage.removeItem('token')
    return {
      ...state,
      user: null,
      isLoggedIn: false,
      isLoading: false
    }
  },
  [GLOBAL.LOGOUT]: (state, action) => {
    localStorage.removeItem('token');
    return {
      ...state,
      user: null,
      isLoggedIn: false
    }
  },
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}