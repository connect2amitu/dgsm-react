import React from 'react'
import { connect } from 'react-redux';
import { getAlbums, clearAlbums } from '../../actions/albums';
import { Button, Grid, CircularProgress, Typography } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import classes from '../../assets/css/album.module.scss';
import AlbumCard from '../../components/AlbumCard';
import Skeleton from 'react-loading-skeleton';

class Albums extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 12,
      page: 0
    }
  }

  render() {
    const { albums, isLoading, error, totalPages, match: { params: { search } } } = this.props
    const { page } = this.state
    var items = [];
    albums.map((album, index) =>
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
    )
    var searchString = "";
    search && search.split(" ").map(a => searchString += `#${a} `)
    return (
      <div className={classes.album}>
        <Grid container justify={"space-between"}>
          <Grid item>
            <h1>{search ? `Searched for ${searchString}` : `All Albums`}</h1>
          </Grid>
        </Grid>
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
            {!isLoading && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
            {!isLoading && error && "Something went wrong"}
          </Grid>
        </Grid>

      </div>
    );
  }
  loadData = () => {
    const { page, size } = this.state
    this.setState({ page: page + 1 }, () => {
      var query = { size, order: 'asc', page: page * size };
      if (this.props.match.params.search) {
        query.q = this.props.match.params.search
      }
      this.props.dispatch(getAlbums(query));
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


var _Albums = connect(mapStateToProps)(Albums)
export default _Albums

