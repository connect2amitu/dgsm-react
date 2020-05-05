
import React from 'react';
import { styled } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Button, Menu, MenuItem, TextField, Tooltip, CircularProgress, List, ListItemText, ListItem, ListItemAvatar, Avatar } from '@material-ui/core';
import { FavoriteBorderRounded, MoreHorizRounded, PlayCircleFilledRounded, PauseCircleFilledRounded, SkipNextRounded, SkipPreviousRounded, QueueMusicRounded, VolumeOffRounded, VolumeUpRounded } from '@material-ui/icons';
import { connect } from 'react-redux';
import { playStopButtonClickHandler, display, removeExt } from '../shared/funs';
import { playerNextTrack, playerPrevTrack, playerMuteUnMute } from '../actions/player';
import Sidebar from './Sidebar';
import icon_512x512 from '../assets/images/icon-512x512.png'
import { HOST_API, GOOGLE_CLIENT_ID } from '../shared/constants';
import { RangeSlider } from './Slider';
import DialogBox from './DialogBox';
import GoogleLogin from 'react-google-login';
import { addAuthUser } from '../actions/global';
import { createPlaylist, getPlaylists, addToPlaylist } from '../actions/playlist';
import classes from '../assets/css/player.module.scss';
import TemporaryDrawer from './PlayerDetail';


const MyAppBar = styled(AppBar)({
  top: 'auto',
  bottom: 0,
  position: "fixed",

});

var trackStyle = {
  borderRadius: "10px",
  background: `url(${icon_512x512})`,
  height: "36px",
  width: "36px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      openPlaylist: false,
      openLoginBox: false,
      playlistName: "",
    };
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { player, isLoadingPlaylist, playlists } = this.props;
    const { open, openPlaylist, openLoginBox, playlistName, anchorEl } = this.state
    var backgroundImage = player.currentTrack.track ? {
      backgroundImage: `url(${HOST_API}/${player.currentTrack.track && player.currentTrack.track.cover})`,
    } : {}
    const isActiveActionBtn = player.currentTrack.track !== null ? false : true;


    return (
      <React.Fragment>
        <MyAppBar color="primary" style={backgroundImage} className={classes.player}  >
          <Toolbar style={{ 'WebkitBackdropFilter': 'blur(255px)', 'backdropFilter': 'blur(255px)', 'backgroundColor': 'rgba(255, 255, 255, 0.1)', }} >
            <Grid container alignItems={"center"}>
              <Grid item className={classes.albumDetail}>
                <Grid container spacing={1} alignItems={"center"}>
                  <Grid item>
                    <div style={trackStyle} />
                  </Grid>
                  <Grid item style={{ width: "190px" }}>
                    <Grid container direction={"column"}>
                      <Grid item>
                        <h4 style={{ margin: 0, fontSize: "12px" }} id="stitle">{player.currentTrack.track && removeExt(player.currentTrack.track.name)}</h4>
                      </Grid>
                      <Grid item>
                        <p style={{ margin: 0, fontSize: "12px" }}>{player.currentTrack.track && player.currentTrack.track.artist_name}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* {/*  */}
                  <Grid item>
                    <Button disabled={isActiveActionBtn} color={"inherit"}> <FavoriteBorderRounded /> </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={this.handleClick} color={"inherit"}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                    >
                      <MoreHorizRounded />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={() => this.openPlaylistModal()}>Add to playlist</MenuItem>
                      <MenuItem onClick={this.handleClose}>Share</MenuItem>
                      <MenuItem onClick={this.handleClose}>View Lyrics</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1} alignItems={"center"} direction={"column"}>
                  <Grid item>
                    <RangeSlider {...this.props} classes={classes} />
                  </Grid>
                  <Grid item>
                    <Grid container spacing={1} alignItems={"center"}>
                      <Grid item>
                        <Tooltip title={"Previous"} placement="top">
                          <Button
                            className={classes.playerActionBtn}
                            disabled={isActiveActionBtn}
                            onClick={() => this.prevSong()} color={"inherit"}>
                            <SkipPreviousRounded />
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title={player.currentTrack.track !== null ? player.isPlaying ? "Pause" : "Play" : "Select track"} placement="top">
                          <Button
                            className={classes.playerActionBtn}
                            disabled={isActiveActionBtn}
                            onClick={() => this.playPause()}
                            color={"inherit"} >
                            {player.isPlaying ? <PauseCircleFilledRounded /> : <PlayCircleFilledRounded />}
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title={"Next"} placement="top">
                          <Button
                            className={classes.playerActionBtn}
                            disabled={isActiveActionBtn}
                            onClick={() => this.nextSong()} color={"inherit"}>
                            <SkipNextRounded />
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item className={classes.muteBtn}>
                        <Tooltip title={player.isMuted ? "Unmute" : "Mute"} placement="top">
                          <Button
                            disabled={isActiveActionBtn}
                            onClick={() => this.muteHandler()} color={"inherit"}>
                            {player.isMuted ? <VolumeOffRounded /> : <VolumeUpRounded />}
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <div>{`${display(player.currentTime)} / ${display(player.durationTime)}`}</div>
                      </Grid>
                      <Grid item className={classes.moreDetail}>
                        <Grid container direction={"row"} alignItems={"center"}>
                          <Grid item >
                            <Tooltip title={"Open Playlist"} placement="top">
                              <TemporaryDrawer
                                player={player}
                                classes={classes}
                              />
                            </Tooltip>
                          </Grid>
                          <Grid item >
                            <QueueMusicRounded onClick={() => this.handlePlaylistSidebar(!open)} style={{ fontSize: "1.3rem" }} />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item className={classes.playlistsBtn} >
                        <Tooltip title={"Open Playlist"} placement="top">
                          <Button
                            onClick={() => this.handlePlaylistSidebar(!open)} color={"inherit"}>
                            <QueueMusicRounded style={{ fontSize: "3rem" }} />
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </MyAppBar>

        <Sidebar open={open} handlePlaylistSidebar={this.handlePlaylistSidebar} />

        <DialogBox size={"md"} handleClose={this.closePlaylistModal} onSubmit={this.createNewPlaylist} open={openPlaylist} heading={"ADDED TO PLAYLIST"} description={""} >
          <List dense={true}>
            {
              playlists.map((playlist, index) =>
                <ListItem key={index} button onClick={() => this.addToPlaylistHandler(playlist.id)}>
                  <ListItemAvatar>
                    <Avatar>
                      <QueueMusicRounded />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={playlist.name}
                  />
                </ListItem>
              )
            }
          </List>
          <TextField autoFocus onChange={(e) => this.setState({ playlistName: e.target.value })} value={playlistName} margin="dense" autoComplete={"off"} id="name" label="Enter playlist name" type="email" fullWidth />
          {isLoadingPlaylist && <CircularProgress />}
        </DialogBox>

        <DialogBox size={"xs"} fullWidth={false} handleClose={this.closePlaylistModal} open={openLoginBox} heading={"Login with Gmail"} description={""} hideActionBtn={true} >
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
            theme={"dark"}
          />
        </DialogBox>

      </React.Fragment>
    );
  }

  muteHandler = () => {
    this.props.dispatch(playerMuteUnMute())
  };

  addToPlaylistHandler = (playlist_id) => {
    const { dispatch, player, user } = this.props;
    var formdata = new FormData();
    formdata.append('user_id', user.id);
    formdata.append('track_id', player.currentTrack.track.id);
    formdata.append('playlist_id', playlist_id);
    dispatch(addToPlaylist(formdata));
    this.closePlaylistModal();
  }






  responseGoogle = (response) => {
    const { dispatch } = this.props;
    var resp = JSON.parse(JSON.stringify(response));
    var formdata = new FormData();
    formdata.append('oauth_provider', resp.tokenObj.idpId);
    formdata.append('oauth_uid', resp.profileObj.googleId);
    formdata.append('name', resp.profileObj.name);
    formdata.append('email', resp.profileObj.email);
    formdata.append('picture', resp.profileObj.imageUrl);
    dispatch(addAuthUser(formdata));
    this.closePlaylistModal();
  }


  openPlaylistModal = () => {
    const { isLoggedIn } = this.props
    if (!isLoggedIn) {
      this.setState({ openLoginBox: true, anchorEl: null });
    } else {
      this.setState({ openPlaylist: true, anchorEl: null });
    }
  }

  closePlaylistModal = () => {
    this.setState({ openPlaylist: false, openLoginBox: false, anchorEl: null });
  }

  createNewPlaylist = () => {
    this.setState({ openPlaylist: false });
    const { dispatch, user, player } = this.props;
    const { playlistName } = this.state;

    var formdata = new FormData();
    formdata.append('name', playlistName);
    formdata.append('user_id', user.id);
    formdata.append('track_id', player.currentTrack.track.id);

    this.setState({ playlistName: "" }, () => {
      dispatch(createPlaylist(formdata));
    })
  }

  handlePlaylistSidebar = (open) => {
    this.setState({ open: open })
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  playPause = () => {
    this.playStopButtonClickHandler(!this.props.player.isPlaying);
  }

  nextSong = () => {
    const { dispatch } = this.props;
    dispatch(playerNextTrack());
  }

  prevSong = () => {
    const { dispatch } = this.props;
    dispatch(playerPrevTrack());
  }

  static getDerivedStateFromProps(props, state) {
    const { player } = props;
    // eslint-disable-next-line no-undef
    navigator.mediaSession.metadata = new MediaMetadata({
      title: player.currentTrack && player.currentTrack.track && player.currentTrack.track.name,
      artist: player.currentTrack && player.currentTrack.track && player.currentTrack.track.artist_name,
      album: player.currentTrack && player.currentTrack.track && player.currentTrack.track.artist_name,
      artwork: [
        { src: `https://chauhanamit.info/static/media/profile.652bae8c.jpg`, sizes: '512x512', type: 'image/png' },
      ]
    });
    return state;
  }


  componentDidMount() {
    const { isLoggedIn, user } = this.props;
    if (isLoggedIn) {
      let query = {
        user_id: user.id
      }
      this.props.dispatch(getPlaylists(query));
    }

    const _this = this;
    navigator.mediaSession.setActionHandler('previoustrack', function () {
      _this.props.dispatch(playerPrevTrack());
    });

    navigator.mediaSession.setActionHandler('nexttrack', function () {
      _this.props.dispatch(playerNextTrack());
    });

    this.props.player.audioObj.addEventListener('ended', function () {
      // Play automatically the next track when audio ends.
      _this.props.dispatch(playerNextTrack());
    });

    /* Play & Pause */

    navigator.mediaSession.setActionHandler('play', async function () {
      await _this.playStopButtonClickHandler(true);
      navigator.mediaSession.playbackState = "playing";
      // Do something more than just playing audio...
    });

    navigator.mediaSession.setActionHandler('pause', function () {
      _this.playStopButtonClickHandler(false);
      navigator.mediaSession.playbackState = "paused";
      // Do something more than just pausing audio...
    });

    /* Stop (supported since Chrome 77) */

    try {
      navigator.mediaSession.setActionHandler('stop', function () {
        // TODO: Clear UI playback...3
        _this.playStopButtonClickHandler(false);
      });
    } catch (error) {
    }

    /* Seek To (supported since Chrome 78) */

    try {
      navigator.mediaSession.setActionHandler('seekto', function (event) {
        if (event.fastSeek && ('fastSeek' in _this.props.player.audioObj)) {
          _this.props.player.audioObj.fastSeek(event.seekTime);
          return;
        }
        _this.props.player.audioObj.currentTime = event.seekTime;
        _this.updatePositionState();
      });
    } catch (error) {
    }


  }

  updatePositionState = () => {
    const _this = this;
    if ('setPositionState' in navigator.mediaSession) {
      navigator.mediaSession.setPositionState({
        duration: _this.props.player.audioObj.duration,
        playbackRate: _this.props.player.audioObj.playbackRate,
        position: _this.props.player.audioObj.currentTime
      });
    }
  }

}

const mapStateToProps = state => {
  return {
    albumDetail: state.albums.albumDetail,
    isLoading: state.albums.isLoading,
    player: state.player,
    playlists: state.playlist.playlists,
    isLoadingPlaylist: state.playlist.isLoading,
    user: state.global.user,
    isLoggedIn: state.global.isLoggedIn,
  }
}
export default connect(mapStateToProps)(Player)
