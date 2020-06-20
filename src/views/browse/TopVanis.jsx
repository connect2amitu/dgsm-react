import React, { Component } from 'react'
import { Grid, Fade, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux';
import { getVaniTrack, clearTracks } from '../../actions/tracks';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import { playStopButtonClickHandler } from '../../shared/funs';
import SongCard from '../../components/SongCard';
import classes from '../../assets/css/track.module.scss';
import ViewMoreBtn from '../../components/ViewMoreBtn';

class TopVanis extends Component {
  constructor(props) {
    super(props);
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }
  render() {
    const { vanis, isLoading, error, player } = this.props
    var items = [];
    vanis.map((track, index) =>
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
            <h1>Top Vanis</h1>
          </Grid>
          <Grid item>
            <ViewMoreBtn to={"/browse/vanis"} />
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
    const { vanis } = this.props;
    this.props.dispatch(playerAddTrack(vanis));
    this.props.dispatch(playerCurrentTrack({ track }));
    this.playStopButtonClickHandler(true);

  }

  componentDidMount() {
    var query = {
      size: 16,
      order: 'asc',
      page: 0,
      content: 'vani',
    }
    this.props.dispatch(getVaniTrack(query))
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

export default connect(mapStateToProps)(TopVanis)

