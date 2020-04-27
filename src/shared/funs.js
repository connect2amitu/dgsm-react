import queryString from 'query-string'
import { playerPlayPause, playerDurationTime, playerCurrentTime, playerNextTrack } from "../actions/player";


export const generateURL = (url, params) => {
  var _url = url;
  const stringified = queryString.stringify(params);
  if (stringified) {
    _url = _url + '?' + stringified;
  }
  return _url;
}

export const fmtMSS = (s) => {
  if (s > 0) {
    return (
      s - (s %= 60)) / 60 + (9 < s ? ':'
        : ':0') + Math.floor(s)
  } else {
    return "00:00";
  }
}

export const display = (seconds) => {
  const format = val => `0${Math.floor(val)}`.slice(-2);
  const minutes = (seconds % 3600) / 60
  return [minutes, seconds % 60].map(format).join(':')
}

export async function playStopButtonClickHandler(status) {


  const _this = this;
  _this.props.dispatch(playerPlayPause(status));
  var audioObj = _this.props.player.audioObj;

  audioObj.play();
  if (status) {
    audioObj.play();
    audioObj.ontimeupdate = function () {
      if (audioObj.ended) {
        _this.props.dispatch(playerNextTrack());
      }
      _this.props.dispatch(playerDurationTime(audioObj.duration));
      _this.props.dispatch(playerCurrentTime(audioObj.currentTime));
    };
  } else {
    audioObj.pause();
    if (_this.state) {
      _this.state.intervalId && clearInterval(_this.state.intervalId)
    }
    console.log('_this.state.intervalId =>', _this.state);

  }
}