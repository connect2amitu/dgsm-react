import { BROWSE } from "../shared/constants";

export function getBrowseWithTrack(data) {
  return {
    type: BROWSE.FETCH_START,
    payload: data
  }
}

export function getMoreBrowseTracks(data) {
  return {
    type: BROWSE.FETCH_START,
    payload: data
  }
}

export function getDGSMBrowse() {
  return {
    type: BROWSE.FETCH_DGSM_START,
  }
}

export function clearBrowse(data) {
  return {
    type: BROWSE.CLEAR_ALL,
    payload: data
  }
}