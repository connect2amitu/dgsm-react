import { takeLatest, call, put } from 'redux-saga/effects';
import { getAll, create, add, getPlaylistTrack } from '../api/playlist';
import { PLAYLIST, GLOBAL } from '../shared/constants';


function fetchAllPlaylist() {
  return function* (options) {
    try {
      const data = yield call(() => getAll(options.payload));
      const action = { type: PLAYLIST.FETCH_SUCCESS, data }
      yield put(action);
    } catch (error) {
      const action = { type: PLAYLIST.FETCH_ERROR, error };
      const unauthorizationAction = { type: GLOBAL.AUTH_USER_ERROR, error };
      yield put(unauthorizationAction);
      yield put(action);
    }
  }
}

function fetchPlaylistTracks() {
  return function* (options) {
    try {
      const data = yield call(() => getPlaylistTrack(options.payload));
      const action = { type: PLAYLIST.FETCH_TRACKS_SUCCESS, data }
      yield put(action);
    } catch (error) {
      console.log('AMItu =>', error);

      const action = { type: PLAYLIST.FETCH_TRACKS_ERROR, error }
      const unauthorizationAction = { type: GLOBAL.AUTH_USER_ERROR, error };
      yield put(unauthorizationAction);
      yield put(action);
    }
  }
}

function createPlaylist() {
  return function* (options) {
    try {
      const data = yield call(() => create(options.payload));
      const action = { type: PLAYLIST.CREATE_SUCCESS, data }
      yield put(action);
    } catch (error) {
      const action = { type: PLAYLIST.CREATE_ERROR, error }
      yield put(action);
    }
  }
}

function addPlaylist() {
  return function* (options) {
    try {
      const data = yield call(() => add(options.payload));
      const action = { type: PLAYLIST.ADD_SUCCESS, data }
      yield put(action);
    } catch (error) {
      const action = { type: PLAYLIST.ADD_ERROR, error }
      yield put(action);
    }
  }
}


export function* playlistWatcher() {
  yield takeLatest(PLAYLIST.FETCH_START, fetchAllPlaylist());
  yield takeLatest(PLAYLIST.CREATE_START, createPlaylist());
  yield takeLatest(PLAYLIST.ADD_START, addPlaylist());
  yield takeLatest(PLAYLIST.FETCH_TRACKS_START, fetchPlaylistTracks());
}

export default [
  playlistWatcher(),
]