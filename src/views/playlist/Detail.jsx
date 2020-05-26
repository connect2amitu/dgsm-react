import React from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Fade, IconButton } from '@material-ui/core';
import { playStopButtonClickHandler, removeExt } from '../../shared/funs';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import PlayPauseButton from '../../components/PlayPauseButton';
import logo from '../../assets/images/logo.png'
import classes from '../../assets/css/album.module.scss';
import { getPlaylistTrack, removeTrackFromPlaylist, removePlaylist } from '../../actions/playlist';
import { CancelRounded, PauseCircleFilledRounded, PlayCircleFilledRounded, RemoveCircleRounded, DeleteForeverRounded } from '@material-ui/icons';


var trackStyle = {
  borderRadius: "10px",
  background: `url(${logo})`,
  height: "60px",
  width: "60px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

class PlaylistDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
    };
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { playlist, isLoading, player } = this.props;
    const { init } = this.state;
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
                        <Button
                          color={"primary"}
                          disabled={playlist && playlist.tracks && playlist.tracks.length > 0 ? false : true}
                          variant={"contained"}
                          onClick={() => player.isPlaying && !init ? this.pauseSong() : this.playSong(playlist && playlist.tracks[0])}
                        >
                          {player.isPlaying && !init ? <PauseCircleFilledRounded /> : <PlayCircleFilledRounded />}
                        &nbsp;{player.isPlaying && !init ? `Pause` : `Play All`}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button color={"primary"} variant={"contained"}>Rename</Button>
                      </Grid>
                      <Grid item>
                        <Button color={"primary"} variant={"contained"} onClick={() => this.deletePlaylist()}><DeleteForeverRounded /> Delete</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction={"column"}>
              <Grid item xs={12} sm={8} md={10}>
                <h3>{`Tracks (${playlist && playlist.tracks && playlist.tracks.length})`}</h3>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    playlist && playlist.tracks && playlist.tracks.length > 0 && playlist.tracks.map((track, index) =>
                      <Fade in={true} key={index}>
                        <Grid item xs={12} >
                          <Grid container spacing={1} alignItems={"center"} >
                            <Grid item >
                              <IconButton
                                onClick={() => this.removeTrack(track.id)}
                                color={"inherit"}>
                                <CancelRounded style={{ color: "gray", fontSize: 18 }} />
                              </IconButton>
                            </Grid>
                            {/* <Grid item><Button style={trackStyle}></Button></Grid> */}
                            <Grid item xs={8} md={2}>
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
                    )}
                </Grid>
              </Grid>
            </Grid>
          </>
        }
      </div>
    )
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
    var formdata = new FormData();
    formdata.append('playlistId', match.params.id);
    dispatch(removePlaylist(formdata, (data) => {
      console.log('deletePlaylist data =>', data);
      if (data.status === 200) {
        history.push("/my-playlist");
      }
    }));
  }

  removeTrack = (trackId) => {
    const { dispatch } = this.props;
    var formdata = new FormData();
    formdata.append('trackId', trackId);
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
    var query = { size: 20, order: 'asc', page: 0, playlist_id: match.params.id }
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


