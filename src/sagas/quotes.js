import { takeLatest, call, put } from 'redux-saga/effects';
import { getQuotes, getQuotesTitle } from '../api/quotes';
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

function fetchQuotesTitle() {
  return function* (options) {
    console.log('options.payload =>', options.payload);

    try {
      const data = yield call(() => getQuotesTitle(options.payload));
      console.log('data =>', data);

      const action = { type: QUOTE.FETCH_TITLE_SUCCESS, data }
      yield put(action);
    } catch (error) {
      const action = { type: QUOTE.FETCH_TITLE_ERROR, error }
      yield put(action);
    }
  }
}

export function* quoteWatcher() {
  yield takeLatest(QUOTE.FETCH_START, fetchQuotes());
  yield takeLatest(QUOTE.FETCH_TITLE_START, fetchQuotesTitle());
}

export default [
  quoteWatcher(),
]