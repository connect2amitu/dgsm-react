import React from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Chip, Fade } from '@material-ui/core';
import { getAlbumWithTrack } from '../../actions/albums';
import { HOST_API } from '../../shared/constants';
import { playStopButtonClickHandler, removeExt } from '../../shared/funs';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import PlayPauseButton from '../../components/PlayPauseButton';
import logo from '../../assets/images/logo.png'
import { PlayCircleFilledRounded, PauseCircleFilledRounded } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import classes from '../../assets/css/album.module.scss';


var trackStyle = {
  borderRadius: "10px",
  background: `url(${logo})`,
  height: "50px",
  width: "50px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

class AlbumsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
    };
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { albumDetail, isLoading, player } = this.props;
    const { init, } = this.state;

    return (
      <div className={classes.albumDetail}>
        {!isLoading && albumDetail &&
          <>
            <Grid container spacing={2} className={classes.albumContainer}>
              <Grid item >
                <Fade in={true}>
                  <div><Button className={classes.cover} style={{ backgroundImage: `url(${HOST_API}/${albumDetail.cover})` }}></Button></div>
                </Fade>
              </Grid>
              <Grid item>
                <Grid container direction={"column"} spacing={1} className={classes.albumMeta}>
                  <Grid item>
                    <h1 className={classes.albumName}>{albumDetail.name}</h1>
                  </Grid>
                  <Grid item>
                    <Grid container direction={"column"} justify={"center"} spacing={1} className={classes.tags} >
                      <Grid item>
                        <span>By <b>{albumDetail.artist_name}</b></span>
                      </Grid>
                      <Grid item>
                        {albumDetail.tags.split(", ").map((tag, index) =>
                          <Chip
                            className={classes.tags}
                            component={NavLink}
                            key={index}
                            to={`/albums/${tag}`}
                            color={"secondary"}
                            style={{ borderRadius: 0, cursor: "pointer", marginRight: 2, padding: 0, height: 20 }}
                            label={tag}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                  </Grid>
                  {albumDetail && albumDetail.tracks && albumDetail.tracks.length > 0 && <Grid item>
                    <Button
                      color={"primary"}
                      variant={"contained"}
                      onClick={() => player.isPlaying && !init ? this.pauseSong() : this.playSong(albumDetail.tracks[0])}
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
                <h3>Tracks ({albumDetail.tracks.length})</h3>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {
                    albumDetail.tracks.map((track, index) =>
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
      const { tracks } = this.props.albumDetail;
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
    var query = { size: 20, order: 'asc', page: 0 }
    this.props.dispatch(getAlbumWithTrack(this.props.match.params.slug, query))

  }

}


const mapStateToProps = state => {
  return {
    albumDetail: state.albums.albumDetail,
    isLoading: state.albums.isLoading,
    player: state.player,
  }
}

export default connect(mapStateToProps)(AlbumsDetail)
