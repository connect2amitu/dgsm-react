
import React from 'react';
import { styled } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Button, Menu, MenuItem, TextField } from '@material-ui/core';
import { FavoriteBorderRounded, MoreHorizRounded, PlayCircleFilledOutlined, PauseCircleFilledRounded, SkipNextRounded, SkipPreviousRounded, QueueMusicRounded } from '@material-ui/icons';
import { connect } from 'react-redux';
import { playStopButtonClickHandler, display } from '../shared/funs';
import { playerNextTrack, playerPrevTrack } from '../actions/player';
import Sidebar from './Sidebar';
import icon_512x512 from '../assets/images/icon-512x512.png'
import { HOST_API } from '../shared/constants';
import { RangeSlider } from './Slider';
import Dialog from './DialogBox';

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
      openPlaylistModal: false,
    };
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { player } = this.props;
    const { anchorEl, open, openPlaylistModal } = this.state
    var backgroundImage = player.currentTrack.track ? {
      backgroundImage: `url(${HOST_API}/${player.currentTrack.track && player.currentTrack.track.cover})`,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    } : {}
    return (
      <React.Fragment>
        <MyAppBar color="primary" style={backgroundImage} >
          <Toolbar
            style={{
              '-webkit-backdrop-filter': 'blur(255px)',
              'backdrop-filter': 'blur(255px)',
              'background-color': 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <Grid container alignItems={"center"}>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <div style={trackStyle}></div>
                  </Grid>
                  <Grid item style={{ width: "190px" }}>
                    <Grid container direction={"column"}>
                      <Grid item>
                        <h4 style={{ margin: 0, fontSize: "12px" }} id="stitle">{player.currentTrack.track && player.currentTrack.track.name}</h4>
                      </Grid>
                      <Grid item>
                        <p style={{ margin: 0, fontSize: "12px" }}>{player.currentTrack.track && player.currentTrack.track.artist_name}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button color={"inherit"}><FavoriteBorderRounded /></Button>
                  </Grid>
                  <Grid item>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} color={"inherit"}><MoreHorizRounded /></Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={this.handleClose}
                    >
                      {/* <MenuItem onClick={() => this.handleOpenClose()}>Add to playlist</MenuItem>
                      <MenuItem onClick={this.handleClose}>Share</MenuItem>
                      <MenuItem onClick={this.handleClose}>View Lyrics</MenuItem> */}
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1} alignItems={"center"} direction={"column"}>
                  <Grid item>
                    {/* <RangeSlider /> */}
                  </Grid>
                  <Grid item>
                    <Grid container spacing={1} alignItems={"center"}>
                      <Grid item>
                        <Button onClick={() => this.prevSong()} color={"inherit"}><SkipPreviousRounded style={{ fontSize: "3rem" }} /></Button>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={() => this.playPause()}
                          color={"inherit"} >
                          {player.isPlaying ? <PauseCircleFilledRounded style={{ fontSize: 30 }} /> : <PlayCircleFilledOutlined style={{ fontSize: 30 }} />}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button onClick={() => this.nextSong()} color={"inherit"}><SkipNextRounded style={{ fontSize: "3rem" }} /></Button>
                      </Grid>
                      <Grid item>
                        <div>{`${display(player.currentTime)} / ${display(player.durationTime)}`}</div>
                      </Grid>
                      <Grid item>
                        <Button onClick={() => this.handlePlaylistSidebar(!open)} color={"inherit"}><QueueMusicRounded style={{ fontSize: "3rem" }} /></Button>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </MyAppBar>
        <Sidebar open={open} handlePlaylistSidebar={this.handlePlaylistSidebar} />
      </React.Fragment >
    );
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
  }
}
export default connect(mapStateToProps)(Player)
