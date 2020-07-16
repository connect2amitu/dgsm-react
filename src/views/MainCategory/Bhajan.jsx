


import React from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Fade, Tabs, Tab } from '@material-ui/core';
import { LANGUAGES } from '../../shared/constants';
import { playStopButtonClickHandler, removeExt, randomNumber } from '../../shared/funs';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import PlayPauseButton from '../../components/PlayPauseButton';
import logo from '../../assets/images/logo.png'
import { PlayCircleFilledRounded, PauseCircleFilledRounded } from '@material-ui/icons';
import classes from '../../assets/css/browse.module.scss';
import { getBrowseWithTrack, clearBrowse } from '../../actions/browse';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Loading from '../../components/Loading';
import NoResultFound from '../../components/NoResultFound';
import Skeleton from '@material-ui/lab/Skeleton';

var trackStyle = {
  borderRadius: "10px",
  background: `url(${logo})`,
  height: "50px",
  width: "50px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minWidth: "inherit",
}


class Bhajan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      size: 50,
      page: 0,
      value: 0,
      lang: 'hindi',
    };
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { browse, isLoading, player, tracks, error, totalPages, isLoadingTracks } = this.props;
    const { init, page, value } = this.state;

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
                  <Grid item>
                    <Button
                      disabled={isLoadingTracks || tracks.length <= 0}
                      color={"primary"}
                      variant={"contained"}
                      onClick={() => player.isPlaying && !init ? this.pauseSong() : this.playSong(tracks[0])}
                    >
                      {player.isPlaying && !init ? <PauseCircleFilledRounded /> : <PlayCircleFilledRounded />}
                        &nbsp;{player.isPlaying && !init ? `Pause` : `Play All`}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className={classes.trackContainer} spacing={2}>
              <Grid item xs={12}>
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
                <Grid container spacing={1} justify={"center"}>
                  {
                    !isLoading && tracks.length > 0 ? tracks.map((track, index) =>
                      <Fade in={true} key={index}>
                        <Grid item xs={12} sm={8} >
                          <Grid container spacing={1} alignItems={"center"} justify={"center"} >
                            <Grid item>{index + 1}</Grid>
                            <Grid item><Button style={trackStyle}></Button></Grid>
                            <Grid item xs={6} md={4}>
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
                      (!isLoadingTracks && tracks.length <= 0) && <Fade in={true}>
                        <Grid item xs={12} >
                          <NoResultFound />
                        </Grid>
                      </Fade>
                  }
                  {
                    isLoadingTracks && !error && new Array(10).fill(null).map((track, index) =>
                      <Fade in={true} key={index}>
                        <Grid item xs={12} sm={8} >
                          <Grid container spacing={1} justify={"center"} >
                            <Grid item><Skeleton style={{ borderRadius: 10 }} variant="rect" width={50} height={50} /></Grid>
                            <Grid item xs={6} md={4}>
                              <Grid container direction={"column"}>
                                <Grid item className={classes.trackName}>
                                  <Skeleton style={{ marginTop: 5 }} variant="rect" width={randomNumber(150, 200)} height={15} />
                                </Grid>
                                <Grid item className={classes.albumName}>
                                  <Skeleton style={{ marginTop: 5 }} variant="rect" width={randomNumber(80, 150)} height={8} />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={2}>
                              <Grid container justify={"center"}>
                                <Skeleton variant="circle" width={25} height={25} />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Fade>
                    )
                  }
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems={"center"} justify={"center"} >
                      <Grid item={12}>
                        {!isLoadingTracks && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
                        {/* {isLoadingTracks && !error && <Loading />} */}
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
      this.props.dispatch(clearBrowse());
      this.props.dispatch(getBrowseWithTrack(query));
    })

  };

  loadData = () => {
    const { page, size, lang } = this.state
    this.setState({ page: page + 1 }, () => {
      var query = { slug: this.props.match.params[0], content: 'bhajan', page: page * size, size, lang };
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

  componentWillUnmount() {
    this.props.dispatch(clearBrowse());
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
