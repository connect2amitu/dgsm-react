


import React from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Fade, CircularProgress, Typography, } from '@material-ui/core';
import { clearAlbums, getDGSMAlbums } from '../../actions/albums';
import { playStopButtonClickHandler } from '../../shared/funs';
import classes from '../../assets/css/album.module.scss';
import NoResultFound from '../../components/NoResultFound';
import AlbumCard from '../../components/AlbumCard';
import Error from '../../components/Error';
import Skeleton from '@material-ui/lab/Skeleton';


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

    !isLoading && albums.length > 0 && albums.map((album, index) =>
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
    );

    return (
      <div className={classes.album} style={{ paddingTop: 15 }}>
        <Grid container spacing={4} justify={"flex-start"} alignItems={"center"} className={classes.container} >
          {items}
          {
            isLoading && !error && new Array(3).fill(null).map((o, index) =>
              <Fade in={true} key={index}>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <Grid container className={classes.albumCard}>
                    <Grid item xs={12}>
                      <Skeleton
                        className={classes.cover}
                        animation={"wave"}
                        variant="rect" />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography style={{ marginTop: "10px" }} variant={"body1"}><Skeleton animation={"wave"} width={180} height={15} variant="rect" /></Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Fade>
            )
          }
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {/* {isLoading && !error && <CircularProgress />} */}
            {!isLoading && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
            {!isLoading && error && <Error />}
            {!isLoading && !error && items.length <= 0 && <Fade in={true} ><Grid item xs={12} sm={4} md={3} lg={2}><NoResultFound /></Grid></Fade>}
          </Grid>
        </Grid>
      </div >
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


