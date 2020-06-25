
import React from 'react';
import { styled } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Menu, MenuItem, TextField, Tooltip, CircularProgress, List, ListItemText, ListItem, ListItemAvatar, Avatar, IconButton } from '@material-ui/core';
import { FavoriteBorderRounded, MoreHorizRounded, PlayCircleFilledRounded, PauseCircleFilledRounded, SkipNextRounded, SkipPreviousRounded, QueueMusicRounded, VolumeOffRounded, VolumeUpRounded, QueuePlayNextRounded } from '@material-ui/icons';
import { connect } from 'react-redux';
import { playStopButtonClickHandler, display, removeExt } from '../shared/funs';
import { playerNextTrack, playerPrevTrack, playerMuteUnMute } from '../actions/player';
import Sidebar from './Sidebar';
import Logo from '../assets/images/logo.png'
import { HOST_API, GOOGLE_CLIENT_ID } from '../shared/constants';
import RangeSlider from './Slider';
import DialogBox from './DialogBox';
import GoogleLogin from 'react-google-login';
import { addAuthUser } from '../actions/global';
import { createPlaylist, getPlaylists, addToPlaylist } from '../actions/playlist';
import FullScreenPlayer from './FullScreenPlayer';
import classes from '../assets/css/player.module.scss';
import Snackbar from './Snackbar';
import _ from 'lodash';


const MyAppBar = styled(AppBar)({
  top: 'auto',
  bottom: 0,
  position: "fixed",

});

var trackStyle = {
  borderRadius: "10px",
  background: `url(${Logo})`,
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
      snackbar: false,
      message: "",
    };
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { player, isLoadingPlaylist, playlists } = this.props;
    const { open, openPlaylist, openLoginBox, playlistName, anchorEl, snackbar, message } = this.state
    var backgroundImage = player.currentTrack.track ? {
      backgroundImage: `url(${HOST_API}/${player.currentTrack.track && player.currentTrack.track.cover})`,

    } : {}
    const isActiveActionBtn = player.currentTrack.track !== null ? false : true;


    return (
      <div className={classes.player} >
        <MyAppBar color="primary" style={backgroundImage} className={classes.appBar} >
          <Toolbar className={classes.toolBar} >
            <Grid container alignItems={"center"} className={classes.container} >
              <Grid item className={classes.playerDetail}>
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
                  <Grid item>
                    <IconButton disabled={true} color={"inherit"}> <FavoriteBorderRounded /> </IconButton>
                  </Grid>
                  <Grid item>
                    {/* <IconButton
                      disabled={isActiveActionBtn}
                      onClick={this.handleClick} color={"inherit"}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                    >
                      <MoreHorizRounded />
                    </IconButton> */}
                    <IconButton
                      disabled={isActiveActionBtn}
                      onClick={this.openPlaylistModal} color={"inherit"}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                    >
                      <QueuePlayNextRounded />
                    </IconButton>
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
              <Grid item className={classes.playerAction}>
                <Grid container spacing={1} alignItems={"center"} direction={"column"}>
                  <Grid item> <RangeSlider  {...this.props} /> </Grid>
                  <Grid item>
                    <Grid container spacing={1} alignItems={"center"}>
                      <Grid item>
                        <Tooltip title={"Previous"} placement="top">
                          <span>
                            <IconButton
                              disabled={isActiveActionBtn}
                              onClick={() => this.prevSong()} color={"inherit"}>
                              <SkipPreviousRounded style={{ fontSize: "2rem" }} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title={player.currentTrack.track !== null ? player.isPlaying ? "Pause" : "Play" : "Select track"} placement="top">
                          <span>
                            <IconButton edge="start" color="inherit"
                              disabled={isActiveActionBtn}
                              onClick={() => this.playPause()}>
                              {player.isPlaying ? <PauseCircleFilledRounded style={{ fontSize: "3rem" }} /> : <PlayCircleFilledRounded style={{ fontSize: "3rem" }} />}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title={"Next"} placement="top">
                          <span>
                            <IconButton
                              disabled={isActiveActionBtn}
                              onClick={() => this.nextSong()} color={"inherit"}>
                              <SkipNextRounded style={{ fontSize: "2rem" }} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Grid>
                      <Grid item className={classes.muteIcon}>
                        <Tooltip title={player.isMuted ? "Unmute" : "Mute"} placement="top">
                          <span>
                            <IconButton
                              disabled={isActiveActionBtn}
                              onClick={() => this.muteHandler()} color={"inherit"}>
                              {player.isMuted ? <VolumeOffRounded /> : <VolumeUpRounded />}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Grid>
                      <Grid item className={classes.duration}>
                        <div>{`${display(player.currentTime)} / ${display(player.durationTime)}`}</div>
                      </Grid>
                      <Grid item className={classes.playlistIcon}>
                        <Tooltip title={"Open Playlist"} placement="top">
                          <span>
                            <IconButton
                              onClick={() => this.handlePlaylistSidebar(!open)} color={"inherit"}>
                              <QueueMusicRounded style={{ fontSize: "2rem" }} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Grid>
                      <Grid item className={classes.playlistDetail}>
                        <Tooltip title={"Open Playlist"} placement="top">
                          <FullScreenPlayer
                            prevSong={this.prevSong}
                            playPause={this.playPause}
                            nextSong={this.nextSong}
                            muteHandler={this.muteHandler}
                            handlePlaylistSidebar={this.handlePlaylistSidebar}
                            isActiveActionBtn={isActiveActionBtn}
                            disabled={isActiveActionBtn}
                            openPlaylist={open}
                            player={player}
                            openPlaylistModal={this.openPlaylistModal}
                            closeMenu={this.handleClose}
                            anchorEl={anchorEl}
                            handleClick={this.handleClick}
                            {...this.props}
                          />
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
          <TextField autoFocus onChange={(e) => this.setState({ playlistName: e.target.value })} value={playlistName} margin="dense" autoComplete={"off"} id="name" label="Enter playlist name" type="text" fullWidth />
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

        <Snackbar open={snackbar} message={message} onClose={this.closeSnackbar} />

      </div>
    );
  }

  muteHandler = () => {
    this.props.dispatch(playerMuteUnMute())
  };

  closeSnackbar = () => {
    this.setState({ snackbar: false, message: "" });
  };

  addToPlaylistHandler = (playlist_id) => {
    const { dispatch, player } = this.props;
    var formdata = new FormData();
    formdata.append('track_id', player.currentTrack.track.id);
    formdata.append('playlist_id', playlist_id);
    dispatch(addToPlaylist(formdata));
    this.closePlaylistModal();
    this.setState({ snackbar: true, message: "Track added in playlist" });
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
    this.setState({ openPlaylist: true, anchorEl: null });
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
    const { dispatch, player } = this.props;
    const { playlistName } = this.state;

    var formdata = new FormData();
    formdata.append('name', playlistName);
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
      title: removeExt(_.get(player, "currentTrack.track.name", "")),
      artist: _.get(player, "currentTrack.track.artist_name", ""),
      album: _.get(player, "currentTrack.track.artist_name", ""),
      artwork: [
        { src: `${HOST_API}/${player.currentTrack.track && player.currentTrack.track.cover}`, sizes: '512x512', type: 'image/png' },
      ]
    });
    return state;
  }


  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.props.dispatch(getPlaylists());
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
