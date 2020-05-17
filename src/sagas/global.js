import { takeLatest, call, put } from 'redux-saga/effects';
import { createUser } from '../api/global';
import { GLOBAL, PLAYLIST } from '../shared/constants';


function registerUser() {
  return function* (options) {
    try {
      const data = yield call(() => createUser(options.payload));
      console.log('registerUser data =>', data);

      const action = { type: GLOBAL.AUTH_USER_SUCCESS, data }
      const actionPlaylist = { type: PLAYLIST.FETCH_SUCCESS, data: { data: data.playlists } }
      console.log('actionPlaylist =>', actionPlaylist);

      yield put(action);
      yield put(actionPlaylist);
    } catch (error) {
      const action = { type: GLOBAL.AUTH_USER_ERROR, error }
      yield put(action);
    }
  }
}


export function* userWatcher() {
  yield takeLatest(GLOBAL.AUTH_USER_START, registerUser());
}

export default [
  userWatcher(),
]