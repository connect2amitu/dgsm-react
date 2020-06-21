


import React from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Chip, Fade, CircularProgress, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { getAlbumWithTrack, getAlbums, clearAlbums, getDGSMAlbums } from '../../actions/albums';
import { HOST_API, LANGUAGES } from '../../shared/constants';
import { playStopButtonClickHandler, removeExt } from '../../shared/funs';
import { playerAddTrack, playerCurrentTrack } from '../../actions/player';
import PlayPauseButton from '../../components/PlayPauseButton';
import logo from '../../assets/images/logo.png'
import { PlayCircleFilledRounded, PauseCircleFilledRounded } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import classes from '../../assets/css/album.module.scss';
import Loading from '../../components/Loading';
import NoResultFound from '../../components/NoResultFound';
import AlbumCard from '../../components/AlbumCard';
import Error from '../../components/Error';

var trackStyle = {
  borderRadius: "10px",
  background: `url(${logo})`,
  height: "50px",
  width: "50px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}


class Vani extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      size: 10,
      page: 0,
      value: 0,
      lang: 'hindi',
      content: 'vani',
      date: new Date()
    };
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { isLoading, albums, error, totalPages } = this.props;
    const { page } = this.state;
    var items = [];

    !isLoading && albums.length > 0 ? albums.map((album, index) =>
      items.push(
        <Fade in={true} key={index}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <AlbumCard
              name={album.name}
              slug={album.slug}
              cover={album.cover}
            />
          </Grid>
        </Fade>
      )
    ) : items.push(<Fade in={true} ><Grid item xs={12} sm={4} md={3} lg={2}><NoResultFound /></Grid></Fade>);

    return (
      <div className={classes.album}>
        <Grid container spacing={1} className={classes.browseContainer}>
          {/* <Grid item >
                <Fade in={true}>
                  <div><Button className={classes.cover} style={{ backgroundImage: `url(${'https://admin.dgsm.in'}/${browse.avatar})` }}></Button></div>
                </Fade>
              </Grid> */}
          {/* <Grid item>
                <Grid container direction={"column"} spacing={1} className={classes.browseMeta}>
                  <Grid item>
                    <h1 className={classes.browseName}>{browse.name}</h1>
                  </Grid>
                  <Grid item>
                    <span>Vani</span>
                  </Grid>
                  {browse && browse.tracks && browse.tracks.length > 0 &&
                    <Grid item>
                      <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => player.isPlaying && !init ? this.pauseSong() : this.playSong(browse.tracks[0])}
                      >
                        {player.isPlaying && !init ? <PauseCircleFilledRounded /> : <PlayCircleFilledRounded />}
                        &nbsp;{player.isPlaying && !init ? `Pause` : `Play All`}
                      </Button>
                    </Grid>
                  }
                </Grid>
              </Grid> */}
        </Grid>
        <Grid container spacing={4} justify={"flex-start"} alignItems={"center"} className={classes.container} >
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {isLoading && !error && <CircularProgress />}
            {!isLoading && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
            {!isLoading && error && <Error />}
          </Grid>
          {items}
        </Grid>
      </div>
    )
  }

  loadData = () => {
    const { page, size } = this.state
    this.setState({ page: page + 1 }, () => {
      var query = { size, order: 'asc', page: page * size, type: 'vani', q: this.props.match.params[0] };
      this.props.dispatch(getDGSMAlbums(query));
    })
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this.props.dispatch(clearAlbums());
  }

}


const mapStateToProps = state => {
  return {
    albums: state.albums.albums,
    error: state.albums.error,
    totalPages: state.albums.totalPages,
    isLoading: state.albums.isLoading,
  }
}

export default connect(mapStateToProps)(Vani)


