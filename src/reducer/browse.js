// import { Map } from 'immutable';
import { BROWSE } from '../shared/constants'

const initialState = {
  isLoading: false,
  isLoadingTracks: false,
  error: false,
  browse: null,
  dgsmMain: [],
  tracks: [],
  init: true,
  totalPages: 0,
  albumDetail: null
};

const actionsMap = {
  [BROWSE.CLEAR_ALL]: (state, action) => {
    return {
      ...state,
      // browse: null,
      tracks: [],
      totalPages: 0,
      error: false,
    }
  },
  [BROWSE.FETCH_START]: (state, action) => {
    var isLoading = state.init ? true : false;
    return {
      ...state,
      browse: state.browse,
      isLoading: isLoading,
      init: false,
      isLoadingTracks: true
    }
  },
  [BROWSE.FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      isLoadingTracks: false,
      browse: action.data.data,
      tracks: [...state.tracks, ...action.data.tracks],
      totalPages: action.data.totalPages,
    }
  },
  [BROWSE.FETCH_ERROR]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      isLoadingTracks: false,
      error: action.error.message,
    }
  },

  [BROWSE.FETCH_DGSM_START]: (state, action) => {
    return {
      ...state,
      isLoading: true,
    }
  },
  [BROWSE.FETCH_DGSM_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      dgsmMain: action.data.data,
    }
  },
  [BROWSE.FETCH_DGSM_ERROR]: (state, action) => {
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