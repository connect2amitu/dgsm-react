import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { connect } from 'react-redux';
import { display } from '../shared/funs';
import { playerCurrentTime } from '../actions/player';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  marked: {
    color: "red",
    background: "blue",
  },
});

function valuetext(value) {
  console.log('value =>', value);
  return `${display(value)}`;
}

export const RangeSlider = ({ player, dispatch }) => {

  const seekHandler = (event, value) => {
    if (value && value > 0) {
      player.audioObj.currentTime = value;
      dispatch(playerCurrentTime(value))
    }
  }
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        value={player.currentTime}
        onChange={seekHandler}
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

const mapStateToProps = state => {
  return {
    albumDetail: state.albums.albumDetail,
    isLoading: state.albums.isLoading,
    player: state.player,
  }
}
export default connect(mapStateToProps)(RangeSlider)
