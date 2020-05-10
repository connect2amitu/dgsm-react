import React from 'react'
import { AppBar, Toolbar, Button, Grid, Typography, Avatar, Tooltip, IconButton } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { NightsStayRounded, WbSunnyRounded } from '@material-ui/icons'
import { changeTheme } from '../../actions/global'
import { connect } from 'react-redux';


function Header(props) {
  const themHandler = () => {
    props.dispatch(changeTheme())
  }
  const { user, isLoggedIn } = props;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justify={"space-between"} alignItems={"center"}>
            <Grid item>
              <Typography variant="h6" component={NavLink} to={"/"} color={"inherit"} style={{ textDecoration: "none" }} > DGSM </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={1} alignItems={"center"}>
                {/* <Grid item>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchRounded />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </div>
                </Grid> */}
                <Grid item>
                  <Button component={NavLink} to={"/browse"} color="inherit">Browse</Button>
                </Grid>
                {/* <Grid item>
                  <Tooltip title={"My Playlist"} placement="top">
                    <Button disabled={false} component={NavLink} to={"/my-playlist"} color="inherit">My Playlist</Button>
                  </Tooltip>
                </Grid> */}
                <Grid item>
                  <Tooltip title={"Theme"} placement="bottom">
                    <IconButton onClick={() => themHandler()} color="inherit"> {props.isDark ? <WbSunnyRounded /> : <NightsStayRounded />}  </IconButton>
                  </Tooltip>
                </Grid>
                {
                  isLoggedIn &&
                  <Grid item>
                    <IconButton><Avatar src={user.picture} /></IconButton>
                  </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
const mapStateToProps = state => {
  return {
    isDark: state.global.isDark,
    user: state.global.user,
    isLoggedIn: state.global.isLoggedIn,
  }
}

export default connect(mapStateToProps)(Header)
