import React, { Component } from 'react'
import { Grid, Fade } from '@material-ui/core'
import { connect } from 'react-redux';
import { getTrack, clearTracks } from '../../actions/tracks';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import { playStopButtonClickHandler, randomNumber } from '../../shared/funs';
import SongCard from '../../components/SongCard';
import classes from '../../assets/css/track.module.scss';
import ViewMoreBtn from '../../components/ViewMoreBtn';
import Skeleton from '@material-ui/lab/Skeleton';






class TopTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 16,
      order: 'asc',
      page: 0,
      content: 'bhajan'
    }
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }
  render() {
    const { tracks, isLoading, error, player } = this.props
    const { size } = this.state
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
        <Grid container spacing={2} className={classes.container}>
          {items}
          {isLoading && !error &&
            new Array(size).fill(null).map((o, index) =>
              <Fade in={true} key={index} style={{ display: "flex" }}>
                <Grid item xs={12} md={6} lg={4} xl={3}>
                  <Grid item xs={2} className={classes.trackCard} >
                    <Skeleton style={{ borderRadius: 10 }} variant="rect" width={64} height={64} />
                  </Grid>
                  <Grid item xs={8} className={classes.trackDetail}>
                    <Grid container direction={"column"}>
                      <Grid item className={classes.trackName}>
                        <Skeleton style={{ marginTop: 5 }} variant="rect" width={randomNumber(150, 200)} height={18} />
                      </Grid>
                      <Grid item className={classes.albumName}>
                        <Skeleton style={{ marginTop: 5 }} variant="rect" width={randomNumber(80, 150)} height={10} />
                      </Grid>
                      <Grid item>
                        <Skeleton style={{ marginTop: 5 }} variant="rect" width={randomNumber(10, 70)} height={7} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid container justify={"center"}>
                      <Skeleton variant="circle" width={25} height={25} />
                    </Grid>
                  </Grid>
                </Grid>
              </Fade>
            )
          }
          {!isLoading && error && "Something went wrong"}
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
    const { size, order, page, content } = this.state
    var query = { size, order, page, content }
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

