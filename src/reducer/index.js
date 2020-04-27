import { combineReducers } from 'redux';
import tracks from './tracks';
import albums from './albums';
import player from './player';
export default combineReducers({
  tracks,
  albums,
  player,
});