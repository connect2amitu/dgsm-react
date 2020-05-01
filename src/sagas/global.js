import { takeLatest, call, put } from 'redux-saga/effects';
import { createUser } from '../api/global';
import { GLOBAL } from '../shared/constants';


function registerUser() {
  return function* (options) {
    try {
      const data = yield call(() => createUser(options.payload));
      const action = { type: GLOBAL.AUTH_USER_SUCCESS, data }
      yield put(action);
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