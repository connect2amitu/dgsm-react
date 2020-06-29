import { takeLatest, call, put } from 'redux-saga/effects';
import { getBrowseData, getMainDGSMBrowse } from '../api/browse';
import { BROWSE } from '../shared/constants';


function fetchBrowse() {
  return function* (options) {
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

function fetchDGSMMainBrowse() {
  return function* (options) {
    try {
      const data = yield call(() => getMainDGSMBrowse(options.payload));
      const action = { type: BROWSE.FETCH_DGSM_SUCCESS, data }
      yield put(action);
    } catch (error) {
      const action = { type: BROWSE.FETCH_DGSM_ERROR, error }
      yield put(action);
    }
  }
}

export function* browseWatcher() {
  yield takeLatest(BROWSE.FETCH_START, fetchBrowse());
  yield takeLatest(BROWSE.FETCH_DGSM_START, fetchDGSMMainBrowse());
}

export default [
  browseWatcher(),
]