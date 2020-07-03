// import { Map } from 'immutable';
import { TRACK } from '../shared/constants'

const initialState = {
  isLoading: false,
  error: false,
  tracks: [],
  vanis: [],
  totalPages: 0,
};

const actionsMap = {
  [TRACK.CLEAR_ALL]: (state, action) => {
    return {
      ...state,
      tracks: [],
      vanis: [],
      totalPages: 0,
      error: false,
    }
  },
  [TRACK.FETCH_ALL_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [TRACK.FETCH_ALL_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      tracks: [...state.tracks, ...action.data.data],
      totalPages: action.data.totalPages,
    }
  },
  [TRACK.FETCH_ALL_ERROR]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error.message,
    }
  },

  [TRACK.FETCH_ALL_VANI_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [TRACK.FETCH_ALL_VANI_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      vanis: [...state.vanis, ...action.data.data],
      totalPages: action.data.totalPages,
    }
  },
  [TRACK.FETCH_ALL_VANI_ERROR]: (state, action) => {
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