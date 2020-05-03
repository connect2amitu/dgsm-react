import React from 'react'
import { AppBar, Toolbar, Button, Grid, Typography, makeStyles, fade, InputBase, Avatar, Tooltip } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { NightsStayRounded, WbSunnyRounded, SearchRounded } from '@material-ui/icons'
import { changeTheme } from '../../actions/global'
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function Header(props) {
  const themHandler = () => {
    props.dispatch(changeTheme())
  }
  const classes = useStyles();
  const { user, isLoggedIn } = props;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justify={"space-between"}>
            <Grid item>
              <Typography variant="h6" component={NavLink} to={"/"} color={"inherit"} style={{ textDecoration: "none" }} > DGSM </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
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
                  <Tooltip title={"Coming Soon"} placement="top">
                    <Button disabled={true} component={NavLink} to={"/my-playlist"} color="inherit">My Playlist</Button>
                  </Tooltip>
                </Grid> */}
                <Grid item>
                  <Tooltip title={"Theme"} placement="bottom">
                    <Button onClick={() => themHandler()} color="inherit"> {props.isDark ? <WbSunnyRounded /> : <NightsStayRounded />}  </Button>
                  </Tooltip>
                </Grid>
                {
                  isLoggedIn &&
                  <Grid item>
                    <Avatar src={user.picture} />
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
