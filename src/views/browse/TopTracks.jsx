import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { PlayArrowRounded, AddCircleRounded } from '@material-ui/icons'
import { connect } from 'react-redux';
import { getTrack, clearTracks } from '../../actions/tracks';
import { NavLink } from 'react-router-dom';



var trackStyle = {
  borderRadius: "10px",
  background: `url("http://localhost/dgsm/uploads/albumCovers/cover27.jpg")`,
  height: "60px",
  width: "60px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}


class TopTracks extends Component {
  render() {
    console.log('this.props tracks=>', this.props.tracks);
    const { tracks, isLoading } = this.props

    return (
      <div>
        <Grid container justify={"space-between"}>
          <Grid item>
            <h1>Top Tracks</h1>
          </Grid>
          <Grid item>
            <Button component={NavLink} to="/browse/tracks" color={"primary"} variant={"contained"}>View more</Button>

          </Grid>
        </Grid>
        <Grid container spacing={3} >
          {!isLoading ?
            tracks.map((track, index) =>
              <Grid item xs={3} id={index} key={index}>
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
              </Grid>
            )
            : "Loading..."}
        </Grid>
      </div>
    )
  }
  componentDidMount() {
    var query = {
      size: 16,
      order: 'asc',
      page: 0
    }
    this.props.dispatch(getTrack(query))
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

export default connect(mapStateToProps)(TopTracks)

