// import { Map } from 'immutable';
import { ALBUM } from '../shared/constants'

const initialState = {
  isLoading: false,
  error: false,
  albums: [],
  totalPages: 0,
  albumDetail: null
};

const actionsMap = {
  [ALBUM.FETCH_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [ALBUM.FETCH_SUCCESS]: (state, action) => {

    return {
      ...state,
      isLoading: false,
      albums: action.data.data,
    }
  },
  [ALBUM.FETCH_ERROR]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error.message,
    }
  },

  [ALBUM.DETAIL_FETCH_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [ALBUM.DETAIL_FETCH_SUCCESS]: (state, action) => {

    return {
      ...state,
      isLoading: false,
      albumDetail: action.data.data,
    }
  },
  [ALBUM.DETAIL_FETCH_ERROR]: (state, action) => {
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