import { ALBUM } from "../shared/constants";

export function getAlbums(data) {
  return {
    type: ALBUM.FETCH_START,
    isLoading: true,
    payload: data
  }
}
export function getAlbumWithTrack(data) {
  return {
    type: ALBUM.DETAIL_FETCH_START,
    isLoading: true,
    payload: data
  }
}