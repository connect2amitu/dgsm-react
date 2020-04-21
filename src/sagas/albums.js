import { takeLatest, call, put } from 'redux-saga/effects';
import {  getAlbums } from '../api/albums';
import { ALBUM } from '../shared/constants';


function fetchAlbums() {
  return function* (options) {
    console.log('options =>',options);
    
    try {
      const data = yield call(() => getAlbums(options.payload));
      const action = { type: ALBUM.FETCH_SUCCESS, data }
      yield put(action);
    } catch (error) {
      const action = { type: ALBUM.FETCH_ERROR, error }
      yield put(action);
    }
  }
}


export function* albumWatcher() {
  yield takeLatest(ALBUM.FETCH_START, fetchAlbums());
}

export default [
  albumWatcher(),
]