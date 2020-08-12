import React, { useState } from 'react'
import { AppBar, Toolbar, Button, Grid, Avatar, Tooltip, IconButton, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
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
  },
  textAlignCenter: {
    textAlign: "center"
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    position: "relative"
  },
  logo: {
    height: "75px",
    width: "75px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",

    position: "absolute",
    bottom: "-42px",
    [theme.breakpoints.down(600)]: {
      bottom: "-37px",
      width: "65px",
      height: "65px",
    },
  },
  contact: {
    position: "absolute",
    bottom: 35,
    textAlign: "center",
    width: "100%",
    "& a": {
      color: "inherit",
    }
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
            <Grid item className={classes.logoSection}>
              <NavLink to={"/"} color={"inherit"} style={{ textDecoration: "none" }}><Avatar className={classes.logo}
                src={require('../../assets/images/TLogo.png')}
              // style={{ backgroundImage: `url(${require('../../assets/images/TLogo.png')})` }}
              ></Avatar>
              </NavLink>
              {/* <Typography variant="h6" component={NavLink} to={"/"} color={"inherit"} style={{ textDecoration: "none" }} > DGSM </Typography> */}
            </Grid>
            <Grid item className={classes.desktop}>
              <Grid container spacing={1} alignItems={"center"}>
                <Grid item>
                  <Button component={NavLink} to={"/browse"} color="inherit">Browse</Button>
                </Grid>
                <Grid item>
                  <Button component={NavLink} to={"/quotes"} color="inherit">Quotes</Button>
                </Grid>
                <Grid item>
                  <Button component={NavLink} to={"/contact"} color="inherit">Contact</Button>
                </Grid>
                <Grid item>
                  <Tooltip title={"My Playlist"} placement="top">
                    <span>
                      <Button disabled={false} component={NavLink} to={"/my-playlist"} color="inherit">My Playlist</Button>
                    </span>
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
              <IconButton onClick={handleDrawerToggle}><MenuRounded style={{ fill: "#fff" }} /></IconButton>
              <SwipeableDrawer
                anchor={"right"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                onOpen={handleDrawerToggle}
              >
                <List>
                  <ListItem style={{ textAlign: "center" }} disabled={true} button component={NavLink} to={"/browse"} onClick={handleDrawerToggle}>
                    <ListItemText primary={"DGSM"} />
                  </ListItem>
                  {
                    isLoggedIn &&
                    <ListItem button style={{ display: "flex", flexDirection: "column" }}>
                      <ListItemIcon><Avatar src={user.picture} style={{ height: 70, width: 70 }} /></ListItemIcon>
                      <ListItemText primary={user.name || "DGSM"} />
                    </ListItem>
                  }
                  <ListItem className={classes.textAlignCenter} button component={NavLink} to={"/browse"} onClick={handleDrawerToggle}>
                    <ListItemText primary={"Browse"} />
                  </ListItem>
                  <ListItem className={classes.textAlignCenter} button component={NavLink} to={"/quotes"} onClick={handleDrawerToggle}>
                    <ListItemText primary={"Quotes"} />
                  </ListItem>
                  <ListItem className={classes.textAlignCenter} button component={NavLink} to={"/my-playlist"} onClick={handleDrawerToggle}>
                    <ListItemText primary={"My Playlist"} />
                  </ListItem>


                  <ListItem className={classes.textAlignCenter} button onClick={() => { themHandler(); handleDrawerToggle() }} >
                    <ListItemText primary={props.isDark ? <WbSunnyRounded /> : <NightsStayRounded />} />
                  </ListItem>
                  {/* <ListItem className={classes.textAlignCenter}>
                    <ListItemText primary={"v1.8"} />
                  </ListItem> */}
                </List>
                <Grid container className={classes.mobileDrawer} spacing={1} alignItems={"center"} direction={"column"}>
                  <div className={classes.contact}>
                    <Typography variant="caption" >
                      <b>Managed By : </b><br />Meera Shyam Satsang Surat.
                    </Typography>
                    <Typography variant="caption" >
                      <br /><b>For more details</b>,
                    </Typography>
                    <Typography variant="caption" >
                      <br />Contact : <a href="tel:+919638250013">(+91) 963-825-0013</a>
                    </Typography>
                  </div>
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