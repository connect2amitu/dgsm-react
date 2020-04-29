import React from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Chip } from '@material-ui/core';
import { getAlbumWithTrack } from '../../actions/albums';
import { HOST_API } from '../../shared/constants';
import { playStopButtonClickHandler } from '../../shared/funs';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import PlayPauseButton from '../../components/PlayPauseButton';
import logo from '../../assets/images/logo.png'
import { GoogleLogin } from 'react-google-login';


var cardStyle = {
  borderRadius: "10px",
  height: "160px",
  width: "160px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  objectFit: "contain"
}

var trackStyle = {
  borderRadius: "10px",
  background: `url(${logo})`,
  height: "60px",
  width: "60px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

class AlbumsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { albumDetail, isLoading, player } = this.props;
    return (
      <div style={{ marginTop: 10 }}>
        {!isLoading && albumDetail &&
          <>
            <Grid container spacing={2}>
              <Grid item >
                <div><Button style={{ ...cardStyle, background: `url(${HOST_API}/${albumDetail.cover}) center center / cover no-repeat` }} /></div>
              </Grid>
              <Grid item>
                <Grid container direction={"column"}>
                  <Grid item>
                    <h1>{albumDetail.name}</h1>
                  </Grid>
                  <Grid item>
                    <span>By <b>{albumDetail.artist_name}</b></span>
                  </Grid>
                  <Grid item>
                    <span>{albumDetail.tags.split(", ").map((tag, index) =>
                      <Chip key={index} color={"secondary"} style={{ borderRadius: 0, marginRight: 2, padding: 0, height: 20 }} label={tag} />
                    )}</span>
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
                    albumDetail.tracks.map((track, index) =>
                      <Grid item xs={12} key={index}>
                        <Grid container spacing={1} alignItems={"center"} >
                          <Grid item style={{ width: "25px" }}>
                            <span >{index + 1}</span>
                          </Grid>
                          <Grid item><Button style={trackStyle}></Button></Grid>
                          <Grid item xs={6} md={2}>
                            <Grid container direction={"column"}>
                              <Grid item>
                                <span style={{ fontSize: 14, fontWeight: 500 }}>{track.name.replace(/\.[^.]*$/, '')}</span>
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
    const { tracks } = this.props.albumDetail;
    this.props.dispatch(playerAddTrack(tracks));
    this.props.dispatch(playerCurrentTrack({ track }));
    this.playStopButtonClickHandler(true);
  }

  pauseSong = () => {
    this.playStopButtonClickHandler(false);
  }

  static getDerivedStateFromProps(props, state) {

    return state;
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


