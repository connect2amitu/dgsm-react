// import { Map } from 'immutable';
import { PLAYLIST } from '../shared/constants'

const initialState = {
  isLoading: false,
  error: false,
  playlists: [],
  playlist: null,
  totalPages: 0,
};

const actionsMap = {
  [PLAYLIST.FETCH_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [PLAYLIST.FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      playlists: action.data.data,
      totalPages: action.data.totalPages,
    }
  },
  [PLAYLIST.FETCH_ERROR]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      playlists: [],
      error: action.error.message,
    }
  },


  [PLAYLIST.FETCH_TRACKS_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [PLAYLIST.FETCH_TRACKS_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      playlist: action.data.data,
      totalPages: action.data.totalPages,
    }
  },
  [PLAYLIST.FETCH_TRACKS_ERROR]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error.message,
    }
  },


  [PLAYLIST.CREATE_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [PLAYLIST.CREATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      playlists: action.data.data,
    }
  },
  [PLAYLIST.CREATE_ERROR]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error.message,
    }
  },
  [PLAYLIST.ADD_START]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [PLAYLIST.ADD_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
    }
  },
  [PLAYLIST.ADD_ERROR]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error.message,
    }
  },


  [PLAYLIST.REMOVE_TRACK_START]: (state, action) => {
    return {
      ...state,
      // isLoading: true
    }
  },
  [PLAYLIST.REMOVE_TRACK_SUCCESS]: (state, action) => {
    let filter = state.playlist.tracks.filter(data => data.id !== action.trackId);
    return {
      ...state,
      isLoading: false,
      playlist: {
        ...state.playlist,
        tracks: filter
      }
    }
  },
  [PLAYLIST.REMOVE_TRACK_ERROR]: (state, action) => {
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