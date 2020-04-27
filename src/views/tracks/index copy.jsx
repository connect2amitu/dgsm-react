import React from 'react'
import { connect } from 'react-redux';
import { getTrack, clearTracks } from '../../actions/tracks';
import { Button, Grid, CircularProgress, Container } from '@material-ui/core';
import { playStopButtonClickHandler } from '../../shared/funs';
import { playerCurrentTrack } from '../../actions/player';
import SongCard from '../../components/SongCard';
import InfiniteScroll from 'react-infinite-scroll-component';

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
      size: 28,
      page: 0,
    }
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { tracks, isLoading, error, hasMore, totalPages, player } = this.props
    const { page } = this.state
    console.log('player.hasMore =>', this.props.hasMore);

    var items = [];
    tracks.map((track, index) =>
      items.push(<Grid item xs={3} id={index} key={index}>
        <SongCard
          track={track}
          player={player}
          playSong={this.playSong}
          pauseSong={this.pauseSong}
        />
      </Grid>)
    )
    return (
      <>
        <Grid container justify={"space-between"}>
          <Grid item>
            <h1>Tracks</h1>
          </Grid>
        </Grid>
        {/* {items} */}

        {/* <Grid container justify={"space-between"}> */}
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={this.loadMore}
          scrollableTarget="scrollableDiv"
          hasMore={hasMore}
          loader={
            <p>Loading...</p>
          }
        // endMessage={
        //   <p style={{ textAlign: 'center' }}>
        //     <b>Yay! You have seen it all</b>
        //   </p>
        // }
        // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
        >
          <Grid container spacing={1}>
            {items}
          </Grid>
        </InfiniteScroll>
        {/* </Grid> */}

        {/* <Grid item xs={12} style={{ textAlign: "center" }}>
          {!isLoading && !error && (page < totalPages) && <Button color={"secondary"} variant={"contained"} onClick={() => this.loadMore()}>Load more</Button>}
          {isLoading && !error && <CircularProgress />}
          {error && "Something went wrong"}
        </Grid> */}

      </>
    );
  }
  loadMore = (_page) => {
    console.log('_page =>', _page);
    const { page, size } = this.state
    this.setState({ page: page + 1 }, () => {
      var query = { size, order: 'asc', page: page * size }
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
    ...state.tracks,
    player: state.player,
  }
}


var _Tracks = connect(mapStateToProps)(Tracks)
export default _Tracks

