import React from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Fade, IconButton, TextField, Tooltip } from '@material-ui/core';
import { playStopButtonClickHandler, removeExt } from '../../shared/funs';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import PlayPauseButton from '../../components/PlayPauseButton';
import DialogBox from '../../components/DialogBox';

import logo from '../../assets/images/logo.png'
import classes from '../../assets/css/album.module.scss';
import { getPlaylistTrack, removeTrackFromPlaylist, removePlaylist, renamePlaylist } from '../../actions/playlist';
import { CancelRounded, PauseCircleFilledRounded, PlayCircleFilledRounded, DeleteForeverRounded, EditRounded } from '@material-ui/icons';
import NoResultFound from '../../components/NoResultFound';

class PlaylistDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      openPlaylist: false,
      playlistName: "",
    };
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { playlist, isLoading, player } = this.props;
    const { init, openPlaylist, playlistName } = this.state;
    return (
      <div className={classes.albumDetail}>
        {!isLoading &&
          <>
            <Grid container spacing={2} className={classes.albumContainer}>
              <Grid item >
                <Fade in={true}>
                  <div><Button className={classes.cover} style={{ backgroundImage: `url(${logo})` }}></Button></div>
                </Fade>
              </Grid>
              <Grid item>
                <Grid container direction={"column"} spacing={1} className={classes.albumMeta}>
                  <Grid item>
                    <h1 className={classes.albumName}>{playlist && playlist.name}</h1>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Tooltip title={"Play all tracks"} placement="top">
                          <span>
                            <IconButton
                              disabled={playlist && playlist.tracks && playlist.tracks.length > 0 ? false : true}
                              onClick={() => player.isPlaying && !init ? this.pauseSong() : this.playSong(playlist && playlist.tracks[0])}
                            >
                              {player.isPlaying && !init ? <PauseCircleFilledRounded /> : <PlayCircleFilledRounded />}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title={"Rename Playlist"} placement="top">
                          <span>
                            <IconButton>
                              <EditRounded onClick={this.openClosePlaylistHandler} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title={"Delete Playlist"} placement="top">
                          <span>
                            <IconButton>
                              <DeleteForeverRounded onClick={this.deletePlaylist} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction={"column"}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    playlist && playlist.tracks && playlist.tracks.length > 0 ? playlist.tracks.map((track, index) =>
                      <Fade in={true} key={index}>
                        <Grid item xs={12} >
                          <Grid container spacing={1} justify={"center"} >
                            <Grid item >
                              <IconButton
                                onClick={() => this.removeTrack(track.id)}
                                color={"inherit"}>
                                <CancelRounded style={{ color: "gray", fontSize: 18 }} />
                              </IconButton>
                            </Grid>
                            {/* <Grid item><Button style={trackStyle}></Button></Grid> */}
                            <Grid item xs={6} md={4}>
                              <Grid container direction={"column"}>
                                <Grid item>
                                  <span style={{ fontSize: 14, fontWeight: 500 }}>{removeExt(track.name)}</span>
                                </Grid>
                                <Grid item>
                                  <span style={{ fontSize: 12 }}>{track.album_name} {track.city_name && `- ${track.city_name}`}</span>
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
                    ) : <Fade in={true}>
                        <Grid item xs={12} ><NoResultFound /></Grid>
                      </Fade>}
                </Grid>
              </Grid>
            </Grid>
            <DialogBox size={"xs"} playlistName={playlistName} handleClose={this.openClosePlaylistHandler} onSubmit={this.renamePlaylist} open={openPlaylist} heading={"RENAME PLAYLIST"} description={""} >
              <TextField autoFocus onChange={(e) => this.setState({ playlistName: e.target.value })} value={playlistName} margin="dense" autoComplete={"off"} id="name" label="Enter playlist name" type="text" fullWidth />
            </DialogBox>
          </>
        }
      </div>
    )
  }




  openClosePlaylistHandler = () => {
    this.setState({ openPlaylist: !this.state.openPlaylist });
  }

  renamePlaylist = () => {
    const { dispatch, match } = this.props;
    const { playlistName } = this.state;
    const formdata = new FormData();
    formdata.append('playlist_id', match.params.id);
    formdata.append('name', playlistName);
    dispatch(renamePlaylist(formdata));
    this.setState({ playlistName: "" }, () => {
      this.openClosePlaylistHandler();
    });
  }


  playSong = (track) => {
    this.setState({
      init: false
    }, () => {
      const { playlist: { tracks } } = this.props;
      this.props.dispatch(playerAddTrack(tracks));
      this.props.dispatch(playerCurrentTrack({ track }));
      this.playStopButtonClickHandler(true);
    })
  }

  deletePlaylist = () => {
    const { dispatch, match, history } = this.props;
    const formdata = new FormData();
    formdata.append('playlist_id', match.params.id);
    dispatch(removePlaylist(formdata, (data) => {
      if (data.status === 200) {
        history.push("/my-playlist");
      }
    }));
  }

  removeTrack = (trackId) => {
    const { dispatch } = this.props;
    const formdata = new FormData();
    formdata.append('track_id', trackId);
    dispatch(removeTrackFromPlaylist(formdata, trackId));
  }

  pauseSong = () => {
    const { player: { isPlaying }, albumDetail, dispatch } = this.props;

    if (!isPlaying) {
      const { tracks } = albumDetail;
      dispatch(playerAddTrack(tracks));
    }
    this.playStopButtonClickHandler(!isPlaying);

  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const query = { size: 20, order: 'asc', page: 0, playlist_id: match.params.id }
    dispatch(getPlaylistTrack(query))
  }
}


const mapStateToProps = state => {
  return {
    isLoading: state.playlist.isLoading,
    totalPages: state.playlist.totalPages,
    error: state.playlist.error,
    playlist: state.playlist.playlist,
    player: state.player,
    user: state.global.user,

  }
}

export default connect(mapStateToProps)(PlaylistDetail)


