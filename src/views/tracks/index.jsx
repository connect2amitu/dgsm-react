import React from 'react'
import { connect } from 'react-redux';
import { getTrack, clearTracks } from '../../actions/tracks';
import { Button, Grid, IconButton, Badge, Tooltip } from '@material-ui/core';
import { playStopButtonClickHandler, randomNumber } from '../../shared/funs';
import { playerCurrentTrack } from '../../actions/player';
import SongCard from '../../components/SongCard';
import { Fade } from '@material-ui/core';
import classes from '../../assets/css/track.module.scss';
import NoResultFound from '../../components/NoResultFound';
import Skeleton from '@material-ui/lab/Skeleton';
import { KeyboardArrowLeftRounded } from '@material-ui/icons';
import Meta from '../../components/SEO';

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
      order: 'ASC',
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
        <Meta title={aZ === "All" ? `All Bhajans | DGSM` : `Bhajan start with ${aZ} | DGSM`} description={aZ === "All" ? `All Bhajans | DGSM` : `Bhajan start with ${aZ} | DGSM`} />

        <Grid container spacing={2}>
          <Grid item>
            <Tooltip title={"Back"} style={{ width: 20, cursor: "pointer" }} placement="bottom">
              <span>
                <KeyboardArrowLeftRounded onClick={() => this.props.history.push(`/browse`)} style={{ fontSize: 40, margin: "18px 0" }} />
              </span>
            </Tooltip>
          </Grid>
          <Grid item>
            <h1>All Tracks</h1>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.heading} direction={"column"}>
          <Grid item>

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
        <Grid container spacing={2} className={classes.container}>
          {items}
          {isLoading && !error &&
            new Array(16).fill(null).map((o, index) =>
              <Fade in={true} key={index}>
                <Grid item xs={12} md={6} lg={4} xl={3}>
                  <Grid container spacing={1}>
                    <Grid item xs={2} className={classes.trackCard} >
                      <Skeleton style={{ borderRadius: 10 }} variant="rect" width={64} height={64} />
                    </Grid>
                    <Grid item xs={8} className={classes.trackDetail}>
                      <Grid container direction={"column"}>
                        <Grid item className={classes.trackName}>
                          <Skeleton style={{ marginTop: 5 }} variant="rect" width={randomNumber(150, 200)} height={18} />
                        </Grid>
                        <Grid item className={classes.albumName}>
                          <Skeleton style={{ marginTop: 5 }} variant="rect" width={randomNumber(80, 150)} height={10} />
                        </Grid>
                        <Grid item>
                          <Skeleton style={{ marginTop: 5 }} variant="rect" width={randomNumber(10, 70)} height={7} />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container justify={"center"}>
                        <Skeleton variant="circle" width={25} height={25} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Fade>
            )
          }
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {!isLoading && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
            {!isLoading && !error && items.length <= 0 && <NoResultFound />}
            {error && "Something went wrong"}
          </Grid>

        </Grid>

      </div>
    );
  }

  changeFilter = (o) => {
    const { aZ } = this.state
    if (aZ !== o) {
      this.setState({
        aZ: o,
        page: 0
      }, () => {
        this.props.history.push(`/browse/tracks${o !== "All" ? `/${o}` : ""}`);
        this.props.dispatch(clearTracks());
        this.loadData()
      })
    }
  }


  loadData = () => {
    const { page, size, content, order } = this.state;
    this.setState({ page: page + 1 }, () => {
      var query = {
        size,
        order,
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

