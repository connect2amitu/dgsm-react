// import { Map } from 'immutable';
import { QUOTE } from '../shared/constants'

const initialState = {
  isLoading: false,
  error: false,
  quotes: [],
  totalPages: 0,
};

const actionsMap = {
  [QUOTE.FETCH_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [QUOTE.CLEAR_ALL]: (state, action) => {
    return {
      ...state,
      quotes: [],
    }
  },
  [QUOTE.FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      quotes: [...state.quotes, ...action.data.data],
      totalPages: action.data.totalPages,
    }
  },
  [QUOTE.FETCH_ERROR]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error.message,
    }
  },
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}