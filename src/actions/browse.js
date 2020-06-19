import { BROWSE } from "../shared/constants";

export function getBrowseWithTrack(data) {
  console.log('getBrowseWithTrack data =>', data);

  return {
    type: BROWSE.FETCH_START,
    isLoading: true,
    payload: data
  }
}

export function getMoreBrowseTracks(data) {
  return {
    type: BROWSE.FETCH_START,
    isLoading: true,
    payload: data
  }
}

export function getDGSMBrowse() {
  return {
    type: BROWSE.FETCH_DGSM_START,
    isLoading: true,
  }
}

export function clearBrowse(data) {
  return {
    type: BROWSE.CLEAR_ALL,
    isLoading: true,
    payload: data
  }
}