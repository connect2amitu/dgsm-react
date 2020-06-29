import { combineReducers } from 'redux';

import tracks from './tracks';
import albums from './albums';
import player from './player';
import global from './global';
import playlist from './playlist';
import browse from './browse';
import quote from './quote';

export default combineReducers({
  tracks,
  albums,
  player,
  global,
  playlist,
  browse,
  quote
});