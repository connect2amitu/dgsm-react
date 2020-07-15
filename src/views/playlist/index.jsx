import React from 'react'
import { connect } from 'react-redux';
import { Button, Grid, CircularProgress, TextField, Typography } from '@material-ui/core';
import { playStopButtonClickHandler } from '../../shared/funs';
import { Fade } from '@material-ui/core';
import PlaylistCard from '../../components/PlaylistCard';
import { getPlaylists, createPlaylist } from '../../actions/playlist';
import DialogBox from '../../components/DialogBox';
import GoogleLogin from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../shared/constants';
import { addAuthUser } from '../../actions/global';
import Skeleton from 'react-loading-skeleton';

var trackStyle = {
  borderRadius: "10px",
  height: "200px",
  width: "200px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

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
    const { playlists, isLoadingPlaylist, isLoggedIn } = this.props
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
          {
            isLoadingPlaylist && !error && new Array(3).fill(null).map((o, index) =>
              <Fade in={true} key={index}>
                <Grid item id={index}>
                  <Grid container direction={"column"} alignItems={"center"}>
                    <Grid item xs={12}>
                      <Skeleton
                        style={trackStyle}
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
          < Grid item xs={12} style={{ textAlign: "center" }}>
            {/* {isLoading && !error && <CircularProgress />} */}
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

        <DialogBox size={"xs"} playlistName={playlistName} handleClose={this.closePlaylistModal} onSubmit={this.createNewPlaylist} open={openPlaylist} heading={"CREATE A NEW PLAYLIST"} description={""} >
          <TextField autoFocus onChange={(e) => this.setState({ playlistName: e.target.value })} value={playlistName} margin="dense" autoComplete={"off"} id="name" label="Enter playlist name" type="text" fullWidth />
          {isLoadingPlaylist && <CircularProgress />}
        </DialogBox>
      </>
    );
  }


  createNewPlaylist = () => {
    this.setState({ openPlaylist: false });
    const { dispatch } = this.props;
    const { playlistName } = this.state;
    var formdata = new FormData();
    formdata.append('name', playlistName);
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
    dispatch(addAuthUser(formdata));
    this.closePlaylistModal();
  }

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.props.dispatch(getPlaylists());
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

