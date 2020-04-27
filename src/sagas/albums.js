import { takeLatest, call, put } from 'redux-saga/effects';
import { getAlbums, getAlbumWithTrack } from '../api/albums';
import { ALBUM } from '../shared/constants';


function fetchAlbums() {
  return function* (options) {

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

function fetchAlbumWithTracks() {
  return function* (options) {

    try {
      const data = yield call(() => getAlbumWithTrack(options.payload));
      const action = { type: ALBUM.DETAIL_FETCH_SUCCESS, data }
      yield put(action);
    } catch (error) {
      const action = { type: ALBUM.DETAIL_FETCH_ERROR, error }
      yield put(action);
    }
  }
}


export function* albumWatcher() {
  yield takeLatest(ALBUM.FETCH_START, fetchAlbums());
  yield takeLatest(ALBUM.DETAIL_FETCH_START, fetchAlbumWithTracks());
}

export default [
  albumWatcher(),
]