import React, { useState } from 'react'
import { AppBar, Toolbar, Button, Grid, Typography, Avatar, Tooltip, IconButton, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { NightsStayRounded, WbSunnyRounded, MenuRounded } from '@material-ui/icons'
import { changeTheme } from '../../actions/global'
import { connect } from 'react-redux';
import { green } from '@material-ui/core/colors';


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
  desktop: {
    display: "block",
    [theme.breakpoints.down(768)]: {
      display: "none",
    },
  },
  mobile: {
    display: "none",
    [theme.breakpoints.down(768)]: {
      display: "block",
    },
  },
  mobileDrawer: {
    width: 250
  }
}));


function Header(props) {
  const themHandler = () => {
    props.dispatch(changeTheme())
  }
  const { user, isLoggedIn } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>

      <AppBar position="fixed">
        <Toolbar>
          <Grid container justify={"space-between"} alignItems={"center"}>
            <Grid item>
              <Typography variant="h6" component={NavLink} to={"/"} color={"inherit"} style={{ textDecoration: "none" }} > DGSM </Typography>
            </Grid>
            <Grid item className={classes.desktop}>
              <Grid container spacing={1} alignItems={"center"}>
                <Grid item>
                  <Button component={NavLink} to={"/browse"} color="inherit">Browse</Button>
                </Grid>
                <Grid item>
                  <Tooltip title={"My Playlist"} placement="top">
                    <Button disabled={false} component={NavLink} to={"/my-playlist"} color="inherit">My Playlist</Button>
                  </Tooltip>
                </Grid>
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
            <Grid item className={classes.mobile}>
              <IconButton onClick={handleDrawerToggle}><MenuRounded /></IconButton>
              <SwipeableDrawer
                anchor={"left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                onOpen={handleDrawerToggle}
              >
                <List>
                  <ListItem disabled={true} button component={NavLink} to={"/browse"} onClick={handleDrawerToggle}>
                    <ListItemText primary={"DGSM"} />
                  </ListItem>
                  <ListItem button component={NavLink} to={"/browse"} onClick={handleDrawerToggle}>
                    <ListItemText primary={"Browse"} />
                  </ListItem>
                  <ListItem button component={NavLink} to={"/my-playlist"} onClick={handleDrawerToggle}>
                    <ListItemText primary={"My Playlist"} />
                  </ListItem>
                  {
                    isLoggedIn &&
                    <ListItem button>
                      <ListItemIcon><Avatar src={user.picture} style={{ height: 70, width: 70 }} /></ListItemIcon>
                      <ListItemText primary={user.name || "DGSM"} />
                    </ListItem>
                  }

                  <ListItem button onClick={() => { themHandler(); handleDrawerToggle() }} >
                    <ListItemText primary={props.isDark ? <WbSunnyRounded /> : <NightsStayRounded />} />
                  </ListItem>
                </List>
                <Grid container className={classes.mobileDrawer} spacing={1} alignItems={"center"} direction={"column"}>
                  {/* <Grid item>
                    <Button component={NavLink} to={"/browse"} color="inherit" onClick={handleDrawerToggle}>Browse</Button>
                  </Grid> */}
                  {/* <Grid item>
                    <Tooltip title={"My Playlist"} placement="top">
                      <Button disabled={false} component={NavLink} to={"/my-playlist"} color="inherit" onClick={handleDrawerToggle}>My Playlist</Button>
                    </Tooltip>
                  </Grid>
                  {
                    isLoggedIn &&
                    <Grid item>
                      <IconButton><Avatar src={user.picture} style={{ height: 70, width: 70 }} /></IconButton>
                    </Grid>
                  }
                  <Grid item>
                    <Tooltip title={"Theme"} placement="bottom">
                      <IconButton onClick={() => { themHandler(); handleDrawerToggle() }} color="inherit"> {props.isDark ? <WbSunnyRounded /> : <NightsStayRounded />}  </IconButton>
                    </Tooltip>
                  </Grid> */}
                </Grid>
              </SwipeableDrawer>
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
