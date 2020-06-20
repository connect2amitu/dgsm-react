import React, { Component } from 'react'
import { Grid, Fade, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux';
import { getTrack, clearTracks } from '../../actions/tracks';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import { playStopButtonClickHandler } from '../../shared/funs';
import SongCard from '../../components/SongCard';
import classes from '../../assets/css/track.module.scss';
import ViewMoreBtn from '../../components/ViewMoreBtn';






class TopTracks extends Component {
  constructor(props) {
    super(props);
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }
  render() {
    const { tracks, isLoading, error, player } = this.props
    console.log('tracks =>', tracks);

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
        <Grid container justify={"space-between"} className={classes.heading}>
          <Grid item>
            <h1>Top Tracks</h1>
          </Grid>
          <Grid item>
            <ViewMoreBtn to={"/browse/tracks"} />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.container}>
          {items}
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {isLoading && !error && <CircularProgress />}
            {error && "Something went wrong"}
          </Grid>
        </Grid>
      </div>
    )
  }

  pauseSong = () => {
    this.playStopButtonClickHandler(false);
  }

  playSong = (track) => {
    const { tracks } = this.props;
    this.props.dispatch(playerAddTrack(tracks));
    this.props.dispatch(playerCurrentTrack({ track }));
    this.playStopButtonClickHandler(true);

  }

  componentDidMount() {
    var query = {
      size: 16,
      order: 'asc',
      page: 0,
      content: 'bhajan'
    }
    this.props.dispatch(getTrack(query))
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

export default connect(mapStateToProps)(TopTracks)

