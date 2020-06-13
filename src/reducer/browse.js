// import { Map } from 'immutable';
import { BROWSE } from '../shared/constants'

const initialState = {
  isLoading: false,
  error: false,
  browse: null,
  tracks: [],
  totalPages: 0,
  albumDetail: null
};

const actionsMap = {
  [BROWSE.CLEAR_ALL]: (state, action) => {
    return {
      ...state,
      browse: null,
      tracks: [],
      totalPages: 0,
      error: false,
    }
  },
  [BROWSE.FETCH_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [BROWSE.FETCH_SUCCESS]: (state, action) => {
    console.log('action.data.tracks =>', action.data.tracks);

    return {
      ...state,
      isLoading: false,
      browse: action.data.data,
      tracks: [...state.tracks, ...action.data.tracks],
      totalPages: action.data.totalPages,
    }
  },
  [BROWSE.FETCH_ERROR]: (state, action) => {
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