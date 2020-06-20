import { takeLatest, call, put } from 'redux-saga/effects';
import { getAll } from '../api/tracks';
import { TRACK } from '../shared/constants';


function fetchAllTracks() {
  return function* (options) {
    try {
      const data = yield call(() => getAll(options.payload));
      console.log('data =>', data);

      const action = { type: TRACK.FETCH_ALL_SUCCESS, data }
      yield put(action);
    } catch (error) {
      const action = { type: TRACK.FETCH_ALL_ERROR, error }
      yield put(action);
    }
  }
}

function fetchAllVaniTracks() {
  return function* (options) {
    try {
      const data = yield call(() => getAll(options.payload));
      console.log('data =>', data);

      const action = { type: TRACK.FETCH_ALL_VANI_SUCCESS, data }
      yield put(action);
    } catch (error) {
      const action = { type: TRACK.FETCH_ALL_VANI_ERROR, error }
      yield put(action);
    }
  }
}


export function* trackWatcher() {
  yield takeLatest(TRACK.FETCH_ALL_START, fetchAllTracks());
  yield takeLatest(TRACK.FETCH_ALL_VANI_START, fetchAllVaniTracks());
}

export default [
  trackWatcher(),
]