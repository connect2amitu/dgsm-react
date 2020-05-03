import React from 'react';
import { DeleteRounded } from '@material-ui/icons';
import { connect } from 'react-redux';
import icon_512x512 from '../assets/images/icon-512x512.png'
import { ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, ListSubheader, Grid, Button, Divider, SwipeableDrawer, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { playerRemoveTrack, clearPlaylist, playerCurrentTrack } from '../actions/player';
import { playStopButtonClickHandler } from '../shared/funs';
import { HOST_API } from '../shared/constants';




var trackStyle = {
  borderRadius: "10px",
  background: `url(${icon_512x512})`,
  height: "100px",
  width: "100px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }


  render() {
    const { open, handlePlaylistSidebar, player: { currentTrack, playlist } } = this.props;

    return (
      <React.Fragment >
        <SwipeableDrawer
          anchor={"right"}
          open={open}
          onClose={() => handlePlaylistSidebar(false)}
          onOpen={() => handlePlaylistSidebar(true)}
        >
          {
            <Paper style={{ width: 350 }} role="presentation"
            // onClick={() => this.props.handlePlaylistSidebar(false)} onKeyDown={() => this.props.handlePlaylistSidebar(false)} 
            >
              <List
                component="nav"
                subheader={
                  <>
                    <ListSubheader component="h1" style={{
                      background: "#ffffff", textAlign: "center", fontWeight: 700,
                      fontSize: "18px"
                    }} color={"primary"} id="nested-list-subheader">
                      <Grid container justify={"space-between"}>
                        <Grid item>
                          {`Playlist ( ${playlist.length} )`}
                        </Grid>
                        <Grid item>
                          {playlist.length > 0 && <><Button color={"secondary"} variant={"contained"} onClick={() => this.clearPlaylist()}>Clear</Button></>}
                        </Grid>
                      </Grid>
                      <Divider />
                    </ListSubheader>
                  </>
                }

              >
                {playlist.length > 0 ? playlist.map((track, index) => {
                  let isActive = currentTrack && currentTrack.track && currentTrack.track.id === track.id
                  return (
                    <List dense={false} style={{ padding: 0 }} key={index}>
                      <ListItem component={Button} style={{ textTransform: "initial" }} color={isActive ? "secondary" : "default"} variant={isActive ? "contained" : "text"} onClick={() => this.changeSong(track)}>
                        <ListItemAvatar>
                          <Avatar alt={track.name} src={`${HOST_API}/${track.cover}`} />
                        </ListItemAvatar>
                        <ListItemText
                          primaryTypographyProps={{ style: { fontSize: 14, } }}
                          secondaryTypographyProps={{ style: { fontSize: 12 } }}
                          style={{ fontSize: 14 }}
                          primary={track.name}
                          secondary={track.album_name}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={() => this.removeTrack(index)}>
                            <DeleteRounded style={{ color: isActive ? "#009688" : "#ff9100" }} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  )
                }
                ) :
                  <Grid container alignItems={"center"} direction={"column"}>
                    <Grid item><Button style={trackStyle}></Button></Grid>
                    <Grid item><h4>Playlist is empty!</h4></Grid>
                    <Grid item><p>Add a song to build your playlist.</p></Grid>
                  </Grid>
                }
              </List>
            </Paper>
          }
        </SwipeableDrawer>
      </React.Fragment >
    );
  }


  changeSong = (track) => {
    this.props.dispatch(playerCurrentTrack({ track }));
    this.playStopButtonClickHandler(true);
  }


  removeTrack = (index) => {
    this.props.dispatch(playerRemoveTrack(index));
  }
  clearPlaylist = () => {
    this.props.dispatch(clearPlaylist());
  }
}


const mapStateToProps = state => {
  return {
    player: state.player,
  }
}
export default connect(mapStateToProps)(Sidebar)
