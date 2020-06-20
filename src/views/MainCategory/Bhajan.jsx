


import React from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Chip, Fade, CircularProgress, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { getAlbumWithTrack } from '../../actions/albums';
import { HOST_API, LANGUAGES } from '../../shared/constants';
import { playStopButtonClickHandler, removeExt } from '../../shared/funs';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import PlayPauseButton from '../../components/PlayPauseButton';
import logo from '../../assets/images/logo.png'
import { PlayCircleFilledRounded, PauseCircleFilledRounded } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import classes from '../../assets/css/browse.module.scss';
import { getBrowseWithTrack, clearBrowse } from '../../actions/browse';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Loading from '../../components/Loading';
import NoResultFound from '../../components/NoResultFound';

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
      size: 10,
      page: 0,
      value: 0,
      lang: 'hindi',
    };
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { browse, isLoading, player, tracks, error, totalPages, total, isLoadingTracks } = this.props;
    const { init, page, value } = this.state;
    console.log('browse =>', browse);
    console.log('tracks =>', tracks);

    return (
      <div className={classes.browse}>
        {!isLoading && browse &&
          <>
            <Grid container spacing={1} className={classes.browseContainer}>
              <Grid item >
                <Fade in={true}>
                  <div><Button className={classes.cover} style={{ backgroundImage: `url(${'https://admin.dgsm.in'}/${browse.avatar})` }}></Button></div>
                </Fade>
              </Grid>
              <Grid item>
                <Grid container direction={"column"} spacing={1} className={classes.browseMeta}>
                  <Grid item>
                    <h1 className={classes.browseName}>{browse.name}</h1>
                  </Grid>
                  <Grid item>
                    <span>Bhajan</span>
                  </Grid>
                  {browse && browse.tracks && browse.tracks.length > 0 &&
                    <Grid item>
                      <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => player.isPlaying && !init ? this.pauseSong() : this.playSong(browse.tracks[0])}
                      >
                        {player.isPlaying && !init ? <PauseCircleFilledRounded /> : <PlayCircleFilledRounded />}
                        &nbsp;{player.isPlaying && !init ? `Pause` : `Play All`}
                      </Button>
                    </Grid>
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid container className={classes.trackContainer} spacing={2} direction={"column"}>
              {/* <Grid item xs={12} sm={8} md={10}>
                <h3 className={classes.trackLabel}>Tracks ({tracks.length})</h3>
              </Grid> */}
              <Grid item xs={12} sm={8} md={10}>
                <Grid container justify={"center"}>
                  <Grid item>
                    <Tabs
                      value={value}
                      onChange={this.handleChange}
                      variant="scrollable"
                      scrollButtons="on"
                      indicatorColor="primary"
                      textColor="primary"
                      aria-label="scrollable force tabs example"
                    >
                      {
                        LANGUAGES.map((lang, index) =>
                          <Tab key={index} label={lang.label} icon={<FavoriteIcon />} />
                        )
                      }
                    </Tabs>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    tracks.length > 0 ? tracks.map((track, index) =>
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
                                  <span style={{ fontSize: 12 }}>{track.artist_name}{` | ${track.type}`}</span>
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
                    ) :
                      <Fade in={true}>
                        <Grid item xs={12} >
                          <NoResultFound />
                        </Grid>
                      </Fade>
                  }
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems={"center"} justify={"center"} >
                      <Grid item={12}>
                        {!isLoadingTracks && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
                        {isLoadingTracks && !error && <Loading />}
                        {error && "Something went wrong"}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        }
        {
          isLoading && <Loading />
        }
      </div>
    )
  }


  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
      page: 1,
      lang: LANGUAGES[newValue].value
    }, () => {
      const { size, lang } = this.state;
      var query = { slug: this.props.match.params[0], content: 'bhajan', page: 0, size, lang };
      console.log('query =>', query);
      this.props.dispatch(clearBrowse());
      this.props.dispatch(getBrowseWithTrack(query));
    })

  };

  loadData = () => {
    const { page, size, lang } = this.state
    this.setState({ page: page + 1 }, () => {
      var query = { slug: this.props.match.params[0], content: 'bhajan', page: page * size, size, lang };
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


  componentDidMount() {
    this.loadData();
  }

}


const mapStateToProps = state => {
  return {
    browse: state.browse.browse,
    error: state.browse.error,
    totalPages: state.browse.totalPages,
    total: state.browse.total,
    tracks: state.browse.tracks,
    isLoading: state.browse.isLoading,
    isLoadingTracks: state.browse.isLoadingTracks,
    player: state.player,
  }
}

export default connect(mapStateToProps)(Bhajan)


