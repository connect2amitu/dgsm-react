import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import reducer from "../reducer";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware()

export default createStore(reducer,
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
      logger
    )));
sagaMiddleware.run(rootSaga);