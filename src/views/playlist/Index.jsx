import React from 'react'
import { connect } from 'react-redux';
import { Button, Grid, CircularProgress, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField } from '@material-ui/core';
import { playStopButtonClickHandler } from '../../shared/funs';
import { Fade } from '@material-ui/core';
import PlaylistCard from '../../components/PlaylistCard';
import { getPlaylists, createPlaylist } from '../../actions/playlist';
import DialogBox from '../../components/DialogBox';
import GoogleLogin from 'react-google-login';
import { GOOGLE_CLIENT_ID, JWT_SECRET } from '../../shared/constants';
import { addAuthUser } from '../../actions/global';
import { QueueMusicRounded } from '@material-ui/icons';
import jwt from 'jsonwebtoken'


class MyPlaylist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      openLoginBox: false,
      openPlaylist: false,
      playlistName: "",

    }
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { isLoading, playlists, isLoadingPlaylist, isLoggedIn } = this.props
    const { error, openLoginBox, openPlaylist, playlistName } = this.state
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
            <Button onClick={this.openPlaylistModal} variant={"contained"} color={"primary"}>Create Playlist</Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} justify={"center"}>
          {items}
          < Grid item xs={12} style={{ textAlign: "center" }}>
            {isLoading && !error && <CircularProgress />}
            {!isLoggedIn && <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={(response) => this.responseGoogle(response, false)}
              onFailure={(response) => this.responseGoogle(response, false)}
              cookiePolicy={'single_host_origin'}
              theme={"dark"}
            />}
          </Grid>
        </Grid>
        <DialogBox size={"xs"} fullWidth={false} handleClose={this.closePlaylistModal} open={openLoginBox} heading={"Login with Gmail"} description={""} hideActionBtn={true} >
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={(response) => this.responseGoogle(response, true)}
            onFailure={(response) => this.responseGoogle(response, true)}
            cookiePolicy={'single_host_origin'}
            theme={"dark"}
          />
        </DialogBox>

        <DialogBox size={"md"} handleClose={this.closePlaylistModal} onSubmit={this.createNewPlaylist} open={openPlaylist} heading={"CREATE A NEW PLAYLIST"} description={""} >
          <TextField autoFocus onChange={(e) => this.setState({ playlistName: e.target.value })} value={playlistName} margin="dense" autoComplete={"off"} id="name" label="Enter playlist name" type="email" fullWidth />
          {isLoadingPlaylist && <CircularProgress />}
        </DialogBox>
      </>
    );
  }


  createNewPlaylist = () => {
    this.setState({ openPlaylist: false });
    const { dispatch, user } = this.props;
    console.log('user =>', user);

    const { playlistName } = this.state;
    var formdata = new FormData();
    formdata.append('name', playlistName);
    formdata.append('user_id', user.id);
    this.setState({ playlistName: "" }, () => {
      dispatch(createPlaylist(formdata));
    })
  }

  responseGoogle = (response, onlyLogin = false) => {
    const { dispatch } = this.props;
    var resp = JSON.parse(JSON.stringify(response));
    var formdata = new FormData();
    formdata.append('oauth_provider', resp.tokenObj.idpId);
    formdata.append('oauth_uid', resp.profileObj.googleId);
    formdata.append('name', resp.profileObj.name);
    formdata.append('email', resp.profileObj.email);
    formdata.append('picture', resp.profileObj.imageUrl);
    console.log('before dispatch =>');
    dispatch(addAuthUser(formdata));
    console.log('after dispatch =>', this.props);
    this.closePlaylistModal();
    // this.setState({ openPlaylist: onlyLogin }, () => {
    //   const { user } = this.props;
    //   const query = { user_id: user.id };
    //   // this.props.dispatch(getPlaylists(query));
    // });
  }

  componentDidMount() {
    const { user, isLoggedIn } = this.props;
    if (isLoggedIn) {
      const query = { user_id: user.id };
      this.props.dispatch(getPlaylists(query));
    }
  }

  openPlaylistModal = () => {
    const { isLoggedIn } = this.props
    if (!isLoggedIn) {
      this.setState({ openLoginBox: true });
    } else {
      this.setState({ openPlaylist: true });
    }
  }

  closePlaylistModal = () => {
    this.setState({ openLoginBox: false, openPlaylist: false });
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

