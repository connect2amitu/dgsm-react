// import { Map } from 'immutable';
import { GLOBAL, JWT_SECRET } from '../shared/constants'
import jwt from 'jsonwebtoken'

var isDark = JSON.parse(localStorage.getItem("theme")) ? true : false
var user = localStorage.getItem("user") ? localStorage.getItem("user") : "";
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
console.log('decodedUser =>', decodedUser);

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
    var token = jwt.sign(action.data.data, JWT_SECRET);
    console.log('token =>', token);

    localStorage.setItem('user', token)
    return {
      ...state,
      user: action.data.data,
      isLoggedIn: true,
      isLoading: false
    }
  },
  [GLOBAL.AUTH_USER_ERROR]: (state, action) => {
    localStorage.removeItem('user')
    return {
      ...state,
      user: null,
      isLoading: false
    }
  },
  [GLOBAL.LOGOUT]: (state, action) => {
    localStorage.removeItem('user');
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