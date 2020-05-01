// import { Map } from 'immutable';
import { GLOBAL } from '../shared/constants'

var isDark = JSON.parse(localStorage.getItem("theme")) ? true : false
var user = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : null

const initialState = {
  isDark,
  user,
  isLoggedIn: user ? true : false,
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
      user: action.payload,
      isLoading: true
    }
  },
  [GLOBAL.AUTH_USER_SUCCESS]: (state, action) => {
    localStorage.setItem('user', JSON.stringify(action.data.data))
    return {
      ...state,
      user: action.data,
      isLoggedIn: true,
      isLoading: false
    }
  },
  [GLOBAL.AUTH_USER_ERROR]: (state, action) => {
    localStorage.setItem('user', action.payload)
    return {
      ...state,
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