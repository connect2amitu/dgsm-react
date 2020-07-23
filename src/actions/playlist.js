import { PLAYLIST } from "../shared/constants";

export function getPlaylists(data) {
  return {
    type: PLAYLIST.FETCH_START,
    payload: data
  }
}

export function getPlaylistTrack(data) {
  return {
    type: PLAYLIST.FETCH_TRACKS_START,
    payload: data
  }
}

export function createPlaylist(data) {
  return {
    type: PLAYLIST.CREATE_START,
    payload: data
  }
}

export function addToPlaylist(data) {
  return {
    type: PLAYLIST.ADD_START,
    payload: data
  }
}

export function removeTrackFromPlaylist(data, trackId) {
  return {
    type: PLAYLIST.REMOVE_TRACK_START,
    payload: data,
    trackId,
  }
}

export function removePlaylist(data, callback) {
  return {
    type: PLAYLIST.REMOVE_START,
    payload: data,
    callback
  }
}

export function renamePlaylist(data) {
  return {
    type: PLAYLIST.RENAME_START,
    payload: data,
  }
}
