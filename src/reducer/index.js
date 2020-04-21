import { combineReducers } from 'redux';
import tracks from './tracks';
import albums from './albums';
export default combineReducers({
  tracks,
  albums,
});