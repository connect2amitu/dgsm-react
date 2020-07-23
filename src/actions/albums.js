import { ALBUM } from "../shared/constants";

export function getAlbums(data) {
  return {
    type: ALBUM.FETCH_START,
    payload: data
  }
}

export function getDGSMAlbums(data) {
  return {
    type: ALBUM.DGSM_FETCH_START,
    payload: data
  }
}
export function getAlbumWithTrack(data, query) {
  return {
    type: ALBUM.DETAIL_FETCH_START,
    payload: data,
    query: query
  }
}

export function clearAlbums(data) {
  return {
    type: ALBUM.CLEAR_ALL,
    payload: data
  }
}