import React from 'react'
import { connect } from 'react-redux';
import { getTrack, clearTracks } from '../../actions/tracks';
import { Button, Grid, CircularProgress, Typography, IconButton, Avatar, Badge } from '@material-ui/core';
import { playStopButtonClickHandler } from '../../shared/funs';
import { playerCurrentTrack } from '../../actions/player';
import SongCard from '../../components/SongCard';
import { Fade } from '@material-ui/core';
import classes from '../../assets/css/track.module.scss';
import NoResultFound from '../../components/NoResultFound';

// var trackStyle = {
//   borderRadius: "10px",
//   background: `url("http://localhost/dgsm/uploads/albumCovers/cover27.jpg")`,
//   height: "60px",
//   width: "60px",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover"
// }

class Tracks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trackIndex: null,
      size: 20,
      page: 0,
      aZ: "All",
      content: 'bhajan',
    }
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { tracks, isLoading, error, totalPages, player } = this.props
    const { page, aZ } = this.state
    var items = [];
    tracks.map((track, index) =>
      items.push(
        <Fade in={true} key={index}>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <SongCard
              track={track}
              player={player}
              playSong={this.playSong}
              pauseSong={this.pauseSong}
            />
          </Grid>
        </Fade>
      )
    )
    return (
      <div className={classes.track}>
        <Grid container spacing={2} className={classes.heading} direction={"column"}>
          <Grid item>
            <h1>All Tracks</h1>
          </Grid>
          <Grid item>
            <Grid container justify={"center"}>
              {
                ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(o =>
                  <IconButton onClick={() => this.changeFilter(o)} size={"medium"} style={{ marginRight: `${o === "All" ? `5px` : `0px`}` }}><Badge color={o === aZ ? "secondary" : "primary"} badgeContent={o}>
                  </Badge></IconButton>
                )
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.container}>
          {items}
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {!isLoading && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
            {isLoading && !error && <CircularProgress />}
            {!isLoading && !error && items.length <= 0 && <NoResultFound />}
            {error && "Something went wrong"}
          </Grid>
        </Grid>

      </div>
    );
  }

  changeFilter = (aZ) => {
    this.setState({
      aZ: aZ,
      page: 0
    }, () => {
      this.props.history.push(`/browse/tracks${aZ !== "All" ? `/${aZ}` : ""}`);
      this.props.dispatch(clearTracks());
      this.loadData()
    })
  }


  loadData = () => {
    const { page, size, content } = this.state;
    this.setState({ page: page + 1 }, () => {
      var query = {
        size,
        order: 'desc',
        page: page * size,
        content,
      }
      if (typeof this.props.match.params.aZ === "undefined" || this.props.match.params.aZ !== "All") {
        query.aZ = this.props.match.params.aZ
      }
      this.props.dispatch(getTrack(query));
    })
  }
  playSong = (track) => {
    this.props.dispatch(playerCurrentTrack({ track }));
    this.playStopButtonClickHandler(true);
  }
  pauseSong = () => {
    this.playStopButtonClickHandler(false);
  }
  componentDidMount() {
    this.setState({
      aZ: this.props.match.params.aZ ? this.props.match.params.aZ : "All"
    }, () => {
      this.loadData()
    })
  }
  componentWillUnmount() {
    this.props.dispatch(clearTracks());
  }
}


const mapStateToProps = state => {
  return {
    ...state.tracks,
    player: state.player,
  }
}


var _Tracks = connect(mapStateToProps)(Tracks)
export default _Tracks

