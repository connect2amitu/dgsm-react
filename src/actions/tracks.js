import { TRACK } from "../shared/constants";

export function getTrack(data) {
  return {
    type: TRACK.FETCH_ALL_START,
    payload: data,
  }
}

export function getVaniTrack(data) {
  return {
    type: TRACK.FETCH_ALL_VANI_START,
    payload: data,
  }
}
export function clearTracks() {
  return {
    type: TRACK.CLEAR_ALL,
  }
}