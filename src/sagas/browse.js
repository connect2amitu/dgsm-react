import { takeLatest, call, put } from 'redux-saga/effects';
import { getBrowseData } from '../api/browse';
import { BROWSE } from '../shared/constants';


function fetchBrowse() {
  return function* (options) {
    console.log('options =>', options);

    try {
      const data = yield call(() => getBrowseData(options.payload));
      const action = { type: BROWSE.FETCH_SUCCESS, data }
      yield put(action);
    } catch (error) {
      const action = { type: BROWSE.FETCH_ERROR, error }
      yield put(action);
    }
  }
}

export function* browseWatcher() {
  yield takeLatest(BROWSE.FETCH_START, fetchBrowse());
}

export default [
  browseWatcher(),
]