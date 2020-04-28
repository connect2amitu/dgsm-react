import React from 'react'
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { getAlbumWithTrack } from '../../actions/albums';
import { HOST_API } from '../../shared/constants';
import { playStopButtonClickHandler } from '../../shared/funs';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import PlayPauseButton from '../../components/PlayPauseButton';


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
  background: `url("http://localhost/dgsm/uploads/albumCovers/cover27.jpg")`,
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
                        <Grid ref={scroll => this.scrollDiv = scroll} container spacing={1} alignItems={"center"} >
                          <Grid item style={{ width: "25px" }}>
                            <span >{index + 1}</span>
                          </Grid>
                          <Grid item><Button style={trackStyle}></Button></Grid>
                          <Grid item xs={6} md={2}>
                            <Grid container direction={"column"}>
                              <Grid item>
                                <span style={{ fontSize: 14, fontWeight: 500 }}>{track.name}</span>
                              </Grid>
                              <Grid item>
                                <span style={{ fontSize: 12 }}>{track.album_name} {track.city_name && `(${track.city_name})`}</span>
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
    const _this = this;
    document.body.onkeyup = function (e) {
      if (e.keyCode === 32) {
        _this.playStopButtonClickHandler(_this.props.player.isPlaying);
      }
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

export default connect(mapStateToProps)(AlbumsDetail)


