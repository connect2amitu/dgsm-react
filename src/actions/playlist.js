import { PLAYLIST } from "../shared/constants";

export function getPlaylists(data) {
  return {
    type: PLAYLIST.FETCH_START,
    isLoading: true,
    payload: data
  }
}

export function getPlaylistTrack(data) {
  return {
    type: PLAYLIST.FETCH_TRACKS_START,
    isLoading: true,
    payload: data
  }
}

export function createPlaylist(data) {
  return {
    type: PLAYLIST.CREATE_START,
    isLoading: true,
    payload: data
  }
}

export function addToPlaylist(data) {
  return {
    type: PLAYLIST.ADD_START,
    isLoading: true,
    payload: data
  }
}

export function removeTrackFromPlaylist(data, trackId) {
  return {
    type: PLAYLIST.REMOVE_TRACK_START,
    isLoading: true,
    payload: data,
    trackId,
  }
}
