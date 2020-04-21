import React from 'react'
import { HOST_API } from '../../shared/constants';
import { connect } from 'react-redux';
import { getTrack } from '../../actions/tracks';
import { Button } from '@material-ui/core';
class Tracks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tracks: [],
      trackIndex: null,
      size: 50
    }
    this.audio = new Audio();
  }


  render() {
    const { tracks, isLoading, error } = this.props
    const { trackIndex } = this.state

    return (
      <>
        {isLoading && <h1>Loading...</h1>}
        <ol>
          {!isLoading && !error &&
            tracks.map((track, index) =>
              <li key={index}>
                <span>{track.name}</span>
                <p>
                  <Button color={"primary"} variant={"contained"} onClick={() => this.playSong(track.filename, index)}>{trackIndex === index ? "Playing..." : "Play"}</Button>
                </p>
              </li>
            )
          }
        </ol>
      </>
    );
  }
  playSong = (url, index) => {
    this.audio.pause();
    this.audio.src = `${HOST_API}/${url}`
    this.audio.play();
    this.setState({ trackIndex: index })
  }
  componentDidMount() {
    const { size } = this.state
    var query = { size, order: 'asc', page: 0 }
    this.props.dispatch(getTrack(query))
  }


}


const mapStateToProps = state => {
  return {
    ...state.tracks
  }
}


var _Tracks = connect(mapStateToProps)(Tracks)
export default _Tracks

