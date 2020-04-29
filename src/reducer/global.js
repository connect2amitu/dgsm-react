// import { Map } from 'immutable';
import { GLOBAL } from '../shared/constants'

var theme = false;
if (JSON.parse(localStorage.getItem("theme"))) {
  theme = true
}
const initialState = {
  isDark: theme
};

const actionsMap = {
  [GLOBAL.CHANGE_THEME]: (state, action) => {
    localStorage.setItem('theme', !state.isDark)
    return {
      ...state,
      isDark: !state.isDark,
    }
  },
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}