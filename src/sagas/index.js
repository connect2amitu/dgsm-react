import { all } from 'redux-saga/effects';
import trackSaga from './tracks';
import albumsSaga from './albums';
import globalSaga from './global';
import playlistSaga from './playlist';

export default function* rootSaga() {
  yield all([
    ...trackSaga,
    ...albumsSaga,
    ...globalSaga,
    ...playlistSaga,
  ]);
}