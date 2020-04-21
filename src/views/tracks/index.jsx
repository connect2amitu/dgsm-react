import React from 'react'
import { HOST_API } from '../../shared/constants';
import { connect } from 'react-redux';
import { getTrack, clearTracks } from '../../actions/tracks';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import { PlayArrowRounded, AddCircleRounded } from '@material-ui/icons';

var trackStyle = {
  borderRadius: "10px",
  background: `url("http://localhost/dgsm/uploads/albumCovers/cover27.jpg")`,
  height: "60px",
  width: "60px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}

class Tracks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trackIndex: null,
      size: 16,
      page: 0
    }
    this.audio = new Audio();
  }

  render() {
    const { tracks, isLoading, error, totalPages } = this.props
    const { page } = this.state
    var items = [];
    tracks.map((track, index) =>
      items.push(<Grid item xs={3} id={index} key={index}>
        <Grid container>
          <Grid item xs={2}><div style={trackStyle}></div></Grid>
          <Grid item xs={10}>
            <Grid container direction={"column"}>
              <Grid item>
                <span>{track.name}</span>
              </Grid>
              <Grid item>
                <Button onClick={() => this.playSong(track.filename, index)} color={"primary"} ><PlayArrowRounded /></Button>
                <Button color={"primary"} ><AddCircleRounded /></Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>)
    )
    return (
      <>
        <Grid container justify={"space-between"}>
          <Grid item>
            <h1>Tracks</h1>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {items}
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {!isLoading && !error && (page < totalPages) && <Button color={"secondary"} variant={"contained"} onClick={() => this.loadMore()}>Load more</Button>}
            {isLoading && !error && <CircularProgress />}
            {error && "Something went wrong"}
          </Grid>
        </Grid>

      </>
    );
  }
  loadMore = () => {
    const { page, size } = this.state
    this.setState({ page: page + 1 }, () => {
      var query = { size, order: 'asc', page: page * size }
      this.props.dispatch(getTrack(query));
    })
  }
  playSong = (url, index) => {
    this.audio.pause();
    this.audio.src = `${HOST_API}/${url}`
    this.audio.play();
    this.setState({ trackIndex: index })
  }
  componentDidMount() {
    const { size, page } = this.state
    this.setState({ page: page + 1 }, () => {
      var query = { size, order: 'asc', page: 0 }
      this.props.dispatch(getTrack(query));
    })
  }
  componentWillUnmount() {
    this.props.dispatch(clearTracks());
  }


}


const mapStateToProps = state => {
  return {
    ...state.tracks
  }
}


var _Tracks = connect(mapStateToProps)(Tracks)
export default _Tracks

