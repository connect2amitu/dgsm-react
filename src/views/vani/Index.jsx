import React from 'react'
import { connect } from 'react-redux';
import { getTrack, clearTracks } from '../../actions/tracks';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import { playStopButtonClickHandler } from '../../shared/funs';
import { playerCurrentTrack } from '../../actions/player';
import SongCard from '../../components/SongCard';
import { Fade } from '@material-ui/core';
import classes from '../../assets/css/track.module.scss';

class Vanis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trackIndex: null,
      size: 28,
      page: 0,
      content: 'vani'
    }
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { tracks, isLoading, error, totalPages, player } = this.props
    const { page } = this.state
    var items = [];
    tracks.map((track, index) =>
      items.push(
        <Fade in={true} key={index}>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <SongCard
              track={track}
              player={player}
              playSong={this.playSong}
              pauseSong={this.pauseSong}
            />
          </Grid>
        </Fade>
      )
    )
    return (
      <div className={classes.track}>
        <Grid container className={classes.heading}>
          <Grid item>
            <h1>All Vanis</h1>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.container}>
          {items}
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {!isLoading && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
            {isLoading && !error && <CircularProgress />}
            {error && "Something went wrong"}
          </Grid>
        </Grid>

      </div>
    );
  }
  loadData = () => {
    const { page, size } = this.state
    this.setState({ page: page + 1 }, () => {
      var query = {
        size,
        order: 'desc',
        page: page * size,
        content: 'vani',
      }
      this.props.dispatch(getTrack(query));
    })
  }
  playSong = (track) => {
    this.props.dispatch(playerCurrentTrack({ track }));
    this.playStopButtonClickHandler(true);
  }
  pauseSong = () => {
    this.playStopButtonClickHandler(false);
  }
  componentDidMount() {
    this.loadData()
  }
  componentWillUnmount() {
    this.props.dispatch(clearTracks());
  }
}


const mapStateToProps = state => {
  return {
    ...state.tracks,
    player: state.player,
  }
}


var _Tracks = connect(mapStateToProps)(Vanis)
export default _Tracks

