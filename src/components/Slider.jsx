import React from 'react';
import Slider from '@material-ui/core/Slider';
import { connect } from 'react-redux';
import { display } from '../shared/funs';
import { playerCurrentTime } from '../actions/player';
import classes from '../assets/css/player.module.scss';

function valuetext(value) {
  return `${display(value)}`;
}

export class RangeSlider extends React.Component {

  seekTrackbar = (event, value) => {
    if (value && value > 0) {
      this.props.player.audioObj.currentTime = value;
      this.props.dispatch(playerCurrentTime(value))
    }
  }
  render() {
    const { player } = this.props
    return (
      <div style={{ position: "absolute", top: -14, left: 410, width: 340 }} className={classes.slider}>
        <Slider
          value={player.currentTime}
          onChange={this.seekTrackbar}
          color={"secondary"}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          max={Math.floor(player.durationTime)}
          valueLabelFormat={valuetext}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}
export default connect(mapStateToProps)(RangeSlider)
