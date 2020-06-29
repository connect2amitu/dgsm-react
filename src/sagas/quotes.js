import { takeLatest, call, put } from 'redux-saga/effects';
import { getQuotes } from '../api/quotes';
import { QUOTE } from '../shared/constants';


function fetchQuotes() {
  return function* (options) {

    try {
      const data = yield call(() => getQuotes(options.payload));
      const action = { type: QUOTE.FETCH_SUCCESS, data }
      yield put(action);
    } catch (error) {
      const action = { type: QUOTE.FETCH_ERROR, error }
      yield put(action);
    }
  }
}

export function* quoteWatcher() {
  yield takeLatest(QUOTE.FETCH_START, fetchQuotes());
}

export default [
  quoteWatcher(),
]