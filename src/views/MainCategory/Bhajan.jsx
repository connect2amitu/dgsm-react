


import React from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Chip, Fade, CircularProgress } from '@material-ui/core';
import { getAlbumWithTrack } from '../../actions/albums';
import { HOST_API } from '../../shared/constants';
import { playStopButtonClickHandler, removeExt } from '../../shared/funs';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import PlayPauseButton from '../../components/PlayPauseButton';
import logo from '../../assets/images/logo.png'
import { PlayCircleFilledRounded, PauseCircleFilledRounded } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import classes from '../../assets/css/album.module.scss';
import { getBrowseWithTrack } from '../../actions/browse';


var trackStyle = {
  borderRadius: "10px",
  background: `url(${logo})`,
  height: "50px",
  width: "50px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

class Bhajan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      size: 2,
      page: 0
    };
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { browse, isLoading, player, tracks, error, totalPages } = this.props;
    const { init, page } = this.state;
    console.log('browse =>', browse);
    console.log('tracks =>', tracks);

    return (
      <div className={classes.albumDetail}>
        {!isLoading && browse &&
          <>
            <Grid container spacing={2} className={classes.albumContainer}>
              <Grid item >
                <Fade in={true}>
                  <div><Button className={classes.cover} style={{ backgroundImage: `url(${'https://admin.dgsm.in'}/${browse.avatar})` }}></Button></div>
                </Fade>
              </Grid>
              <Grid item>
                <Grid container direction={"column"} spacing={1} className={classes.albumMeta}>
                  <Grid item>
                    <h1 className={classes.albumName}>{browse.name}</h1>
                  </Grid>
                  <Grid item>
                    <Grid container direction={"column"} justify={"center"} spacing={1} className={classes.tags} >
                      <Grid item>
                        <span>By <b>{browse.artist_name}</b></span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                  </Grid>
                  {browse && browse.tracks && browse.tracks.length > 0 && <Grid item>
                    <Button
                      color={"primary"}
                      variant={"contained"}
                      onClick={() => player.isPlaying && !init ? this.pauseSong() : this.playSong(browse.tracks[0])}
                    >
                      {player.isPlaying && !init ? <PauseCircleFilledRounded /> : <PlayCircleFilledRounded />}
                        &nbsp;{player.isPlaying && !init ? `Pause` : `Play All`}
                    </Button>
                  </Grid>}
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction={"column"}>
              <Grid item xs={12} sm={8} md={10}>
                <h3>Tracks ({tracks.length})</h3>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    tracks.map((track, index) =>
                      <Fade in={true} key={index}>
                        <Grid item xs={12} >
                          <Grid container spacing={1} alignItems={"center"} >
                            <Grid item style={{ width: "25px" }}>
                              <span >{index + 1}</span>
                            </Grid>
                            <Grid item><Button style={trackStyle}></Button></Grid>
                            <Grid item xs={6} md={2}>
                              <Grid container direction={"column"}>
                                <Grid item>
                                  <span style={{ fontSize: 14, fontWeight: 500 }}>{removeExt(track.name)}</span>
                                </Grid>
                                <Grid item>
                                  <span style={{ fontSize: 12 }}>{track.artist_name}{track.other_artist_name && ` | ${track.other_artist_name}`}  {track.city_name && `(${track.city_name})`}</span>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <PlayPauseButton
                                track={track}
                                pauseSong={this.pauseSong}
                                playSong={this.playSong}
                                isPlaying={player.isPlaying}
                                currentTrack={player.currentTrack}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Fade>
                    )}
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                {!isLoading && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
                {isLoading && !error && <CircularProgress />}
                {error && "Something went wrong"}
              </Grid>
            </Grid>

          </>
        }
      </div>
    )
  }


  loadData = () => {
    const { page, size } = this.state
    this.setState({ page: page + 1 }, () => {
      var query = { slug: this.props.match.params[0], content: 'bhajan', page: page * size, size: size };
      console.log('query =>', query);

      this.props.dispatch(getBrowseWithTrack(query));
    })
  }


  playSong = (track) => {
    this.setState({
      init: false
    }, () => {
      const { tracks } = this.props;
      this.props.dispatch(playerAddTrack(tracks));
      this.props.dispatch(playerCurrentTrack({ track }));
      this.playStopButtonClickHandler(true);
    })
  }

  pauseSong = () => {
    const { player: { isPlaying } } = this.props;

    if (!isPlaying) {
      const { tracks } = this.props.albumDetail;
      this.props.dispatch(playerAddTrack(tracks));
    }
    this.playStopButtonClickHandler(!isPlaying);

  }


  // loadData = () => {
  //   const { page, size } = this.state
  //   this.setState({ page: page + 1 }, () => {
  //     var query = { slug: this.props.match.params[0], content: 'bhajan', page: page * size };
  //     this.props.dispatch(getBrowseWithTrack(query));
  //   })
  // }

  componentDidMount() {
    this.loadData();
  }

}


const mapStateToProps = state => {
  return {
    browse: state.browse.browse,
    error: state.browse.error,
    totalPages: state.browse.totalPages,
    tracks: state.browse.tracks,
    isLoading: state.browse.isLoading,
    player: state.player,
  }
}

export default connect(mapStateToProps)(Bhajan)


