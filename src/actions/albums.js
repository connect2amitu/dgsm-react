import { ALBUM } from "../shared/constants";

export function getAlbums(data) {
  return {
    type: ALBUM.FETCH_START,
    isLoading: true,
    payload: data
  }
}