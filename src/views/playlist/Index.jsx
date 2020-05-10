import React from 'react'
import { connect } from 'react-redux';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import { playStopButtonClickHandler } from '../../shared/funs';
import { Fade } from '@material-ui/core';
import PlaylistCard from '../../components/PlaylistCard';
import { getPlaylists } from '../../actions/playlist';


class MyPlaylist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { isLoading, playlists } = this.props
    const { error } = this.state
    var items = [];
    playlists.map((playlist, index) =>
      items.push(
        <Fade in={true}>
          <Grid item id={index} key={index}>
            <PlaylistCard
              name={playlist.name}
              id={playlist.id}
            />
          </Grid>
        </Fade>
      )
    )
    return (
      <>
        <Grid container justify={"space-between"} alignItems={"center"} >
          <Grid item>
            <h1>My Playlist</h1>
          </Grid>
          <Grid item>
            <Button variant={"contained"} color={"primary"}>Create Playlist</Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} justify={"center"}>
          {items}
          < Grid item xs={12} style={{ textAlign: "center" }}>
            {isLoading && !error && <CircularProgress />}
            {error && "Something went wrong"}
          </Grid>
        </Grid>
      </>
    );
  }

  componentDidMount() {
    const { user, isLoggedIn } = this.props;
    if (isLoggedIn) {
      const query = { user_id: user.id };
      this.props.dispatch(getPlaylists(query));
    } else {
      this.setState({
        error: "not logged in"
      })
    }
  }
}


const mapStateToProps = state => {
  return {
    ...state.tracks,
    player: state.player,
    user: state.global.user,
    isLoggedIn: state.global.isLoggedIn,
    playlists: state.playlist.playlists,
    isLoadingPlaylist: state.playlist.isLoading,
  }
}


var _MyPlaylist = connect(mapStateToProps)(MyPlaylist)
export default _MyPlaylist

