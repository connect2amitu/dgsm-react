import { PLAYER, HOST_API } from '../shared/constants';

const initialState = {
  playlist: [],
  audioObj: new Audio(),
  currentTrack: {
    track: null,
    // index: 0
  },
  currentTime: 0,
  durationTime: 0,
  isPlaying: false,
  isMuted: false,
  isLoading: false
};

const actionsMap = {
  [PLAYER.PLAY_PAUSE]: (state, action) => {
    return {
      ...state,
      isPlaying: action.payload
    }
  },

  [PLAYER.MUTE]: (state, action) => {
    return {
      ...state,
      isMuted: action.payload
    }
  },

  [PLAYER.ADD_TRACK]: (state, action) => {
    var playlist = [...state.playlist];
    if (state.playlist.length > 0) {
      const found = state.playlist.some(el => el.id === action.payload[0].id);
      if (!found) {
        playlist = [...playlist, ...action.payload]
      }
    } else {
      playlist = [...action.payload]
    }

    return {
      ...state,
      playlist
    }
  },

  [PLAYER.REMOVE_TRACK]: (state, action) => {
    var playlist = [...state.playlist];
    playlist.splice(action.payload, 1)
    return {
      ...state,
      playlist
    }
  },

  [PLAYER.CLEAR_PLAY_LIST]: (state, action) => {
    return {
      ...state,
      playlist: []
    }
  },

  [PLAYER.TRACK_CHANGE]: (state, action) => {
    return {
      ...state,
      currentTrack: action.payload
    }
  },

  [PLAYER.CURRENT_TIME]: (state, action) => {
    return {
      ...state,
      currentTime: action.payload
    }
  },

  [PLAYER.DURATION_TIME]: (state, action) => {
    return {
      ...state,
      durationTime: action.payload
    }
  },

  [PLAYER.CURRENT_TRACK]: (state, action) => {
    var audioObj = state.audioObj;
    audioObj.src = `${HOST_API}/${action.payload.track.url}`;
    audioObj.play();
    document.title = `${action.payload.track.name} | DGSM`;
    return {
      ...state,
      isPlaying: true,
      currentTrack: action.payload
    }
  },

  [PLAYER.NEXT_TRACK]: (state, action) => {

    var playlist = state.playlist;
    if (playlist.length) {
      var index = playlist.findIndex(x => x.id === state.currentTrack.track.id)
      var audioObj = state.audioObj;
      let newIndex = (index + 1) % playlist.length;

      var currentTrack = {
        track: playlist[newIndex],
        // index: newIndex
      };
      audioObj.src = `${HOST_API}/${playlist[newIndex].url}`;
      audioObj.play();
      document.title = `${currentTrack.track.name} | DGSM`;

      return {
        ...state,
        currentTrack,
        isPlaying: true
      }
    } else {
      return state
    }
  },

  [PLAYER.PREV_TRACK]: (state, action) => {
    var playlist = state.playlist;
    if (playlist.length) {
      var index = playlist.findIndex(x => x.id === state.currentTrack.track.id)
      var audioObj = state.audioObj;
      let newIndex = (index === 0 && playlist.length - 1) || index - 1

      var currentTrack = {
        track: playlist[newIndex],
        // index: newIndex
      };
      audioObj.src = `${HOST_API}/${playlist[newIndex].url}`;
      audioObj.play();
      document.title = `${currentTrack.track.name} | DGSM`;

      return {
        ...state,
        currentTrack,
        isPlaying: true
      }
    } else {
      return state
    }
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}