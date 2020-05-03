import React, { Component } from 'react'
import { Grid, Button, Fade } from '@material-ui/core'
import { connect } from 'react-redux';
import { getTrack, clearTracks } from '../../actions/tracks';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import { playStopButtonClickHandler } from '../../shared/funs';
import SongCard from '../../components/SongCard';






class TopTracks extends Component {
  constructor(props) {
    super(props);
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }
  render() {
    const { tracks, isLoading, error, player } = this.props

    return (
      <div>
        <Grid container justify={"space-between"}>
          <Grid item>
            <h1>Top Tracks</h1>
          </Grid>
          <Grid item>
            <Button component={NavLink} to="/browse/tracks" color={"primary"} variant={"contained"}>View more</Button>

          </Grid>
        </Grid>
        <Grid container spacing={3} >
          {
            !isLoading && error && <Error />
          }
          {!isLoading ?
            tracks.map((track, index) =>
              <Fade in={true} key={index}>
                <Grid item xs={3} >
                  <SongCard
                    track={track}
                    player={player}
                    playSong={this.playSong}
                    pauseSong={this.pauseSong}
                  />
                </Grid>
              </Fade>
            )
            : <Loading />}
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
      page: 0
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

