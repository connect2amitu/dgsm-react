import { PLAYER } from '../shared/constants';

//Play Pause Handler
export function playerPlayPause(data) {
  return {
    type: PLAYER.PLAY_PAUSE,
    payload: data
  };
}

//Fetch Play List Handler
export function playerFetchPlayerList(data) {
  return {
    type: PLAYER.FETCH_PLAY_LIST,
    payload: data
  };
}

//Add Track to play list Handler
export function playerAddTrack(data) {
  return {
    type: PLAYER.ADD_TRACK,
    payload: data
  };
}
//next Track to play list Handler
export function playerNextTrack(data) {
  return {
    type: PLAYER.NEXT_TRACK,
  };
}
//previous Track to play list Handler
export function playerPrevTrack(data) {
  return {
    type: PLAYER.PREV_TRACK,
  };
}

//Remove Track from play list Handler
export function playerRemoveTrack(data) {
  return {
    type: PLAYER.REMOVE_TRACK,
    payload: data
  };
}

//Clear Playlist
export function clearPlaylist() {
  return {
    type: PLAYER.CLEAR_PLAY_LIST,
  };
}

//Mute or Unmute player Handler
export function playerMuteUnMute(data) {
  return {
    type: PLAYER.MUTE,
    payload: data
  };
}

//Current Time of track Handler
export function playerCurrentTime(data) {
  return {
    type: PLAYER.CURRENT_TIME,
    payload: data
  };
}

//Duration Time of track Handler
export function playerDurationTime(data) {
  return {
    type: PLAYER.DURATION_TIME,
    payload: data
  };
}

//Current track Handler
export function playerCurrentTrack(data) {
  return {
    type: PLAYER.CURRENT_TRACK,
    payload: data
  };
}

//Change Track Handler
export function playerChangeTrack(data) {
  return {
    type: PLAYER.TRACK_CHANGE,
    payload: data
  };
}