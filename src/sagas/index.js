import { all } from 'redux-saga/effects';
import trackSaga from './tracks';
import albumsSaga from './albums';

export default function* rootSaga() {
  yield all([
    ...trackSaga,
    ...albumsSaga,
  ]);
}