import { ALBUM } from "../shared/constants";

export function getAlbums(data) {
  return {
    type: ALBUM.FETCH_START,
    isLoading: true,
    payload: data
  }
}

export function getDGSMAlbums(data) {
  return {
    type: ALBUM.DGSM_FETCH_START,
    isLoading: true,
    payload: data
  }
}
export function getAlbumWithTrack(data, query) {
  return {
    type: ALBUM.DETAIL_FETCH_START,
    isLoading: true,
    payload: data,
    query: query
  }
}

export function clearAlbums(data) {
  return {
    type: ALBUM.CLEAR_ALL,
    isLoading: true,
    payload: data
  }
}