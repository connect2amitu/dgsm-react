// import { Map } from 'immutable';
import { QUOTE } from '../shared/constants'

const initialState = {
  isLoading: false,
  error: false,
  quotes: null,
  quotes_title: [],
  totalPages: 0,
};

const actionsMap = {
  [QUOTE.CLEAR_ALL]: (state, action) => {
    return {
      ...state,
      quotes: [],
    }
  },
  [QUOTE.FETCH_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [QUOTE.FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      quotes: action.data.data,
    }
  },
  [QUOTE.FETCH_ERROR]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error.message,
    }
  },
  [QUOTE.FETCH_TITLE_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [QUOTE.FETCH_TITLE_SUCCESS]: (state, action) => {
    console.log('action =>', action);

    return {
      ...state,
      isLoading: false,
      quotes_title: action.data.data,
    }
  },
  [QUOTE.FETCH_TITLE_ERROR]: (state, action) => {
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