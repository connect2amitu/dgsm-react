import React from 'react'
import { connect } from 'react-redux';
import { getTrack, clearTracks } from '../../actions/tracks';
import { Button, Grid } from '@material-ui/core';
import { playStopButtonClickHandler, randomNumber } from '../../shared/funs';
import { playerCurrentTrack } from '../../actions/player';
import SongCard from '../../components/SongCard';
import { Fade } from '@material-ui/core';
import classes from '../../assets/css/track.module.scss';
import Skeleton from '@material-ui/lab/Skeleton';

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
          {isLoading && !error &&
            new Array(16).fill(null).map((o, index) =>
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
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {!isLoading && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
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
    this.loadData();
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

