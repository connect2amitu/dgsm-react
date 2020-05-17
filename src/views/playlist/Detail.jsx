import React from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Fade } from '@material-ui/core';
import { playStopButtonClickHandler, removeExt } from '../../shared/funs';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import PlayPauseButton from '../../components/PlayPauseButton';
import logo from '../../assets/images/logo.png'
import classes from '../../assets/css/album.module.scss';
import { getPlaylistTrack } from '../../actions/playlist';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../shared/constants';


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
                    {/* <Button
                      color={"primary"}
                      variant={"contained"}
                      onClick={() => player.isPlaying && !init ? this.pauseSong() : this.playSong(albumDetail.tracks[0])}
                    >
                      {player.isPlaying && !init ? <PauseCircleFilledRounded /> : <PlayCircleFilledRounded />}
                        &nbsp;{player.isPlaying && !init ? `Pause` : `Play All`}
                    </Button> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction={"column"}>
              <Grid item xs={12} sm={8} md={10}>
                <h3>Tracks</h3>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    playlist && playlist.tracks.length > 0 && playlist.tracks.map((track, index) =>
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

  pauseSong = () => {
    const { player: { isPlaying } } = this.props;

    if (!isPlaying) {
      const { tracks } = this.props.albumDetail;
      this.props.dispatch(playerAddTrack(tracks));
    }
    this.playStopButtonClickHandler(!isPlaying);

  }

  componentDidMount() {
    const { dispatch, user, match } = this.props;
    var query = { size: 20, order: 'asc', page: 0, user_id: user.id, playlist_id: match.params.id }
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


