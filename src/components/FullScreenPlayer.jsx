// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import MoreVertRounded from '@material-ui/icons/MoreVertRounded';

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });

// export default function TemporaryDrawer() {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === 'top' || anchor === 'bottom',
//       })}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div>
//       <Button onClick={toggleDrawer("bottom", true)}><MoreVertRounded /></Button>
//       <SwipeableDrawer fullScreen anchor={"bottom"} open={state["bottom"]} onClose={toggleDrawer("bottom", false)}>
//         {list("bottom")}
//       </SwipeableDrawer >
//     </div>
//   );
// }

import React from 'react';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, Grid, Fade, Chip } from '@material-ui/core';
import { MoreVertRounded, ExpandMoreRounded } from '@material-ui/icons';
import logo from '../assets/images/logo.png'
import { HOST_API } from '../shared/constants';
import classes from '../assets/css/player.module.scss';
import { NavLink } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

var cardStyle = {
  borderRadius: "10px",
  height: "180px",
  width: "180px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  objectFit: "contain"
}


export default function FullScreenPlayer(props) {
  const [open, setOpen] = React.useState(false);
  const { player, disabled } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.player}>
      <IconButton disabled={disabled} onClick={handleClickOpen} color={"inherit"}><MoreVertRounded /></IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar >
          <Toolbar>
            <Grid container justify={"flex-end"}>
              <Grid item>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <ExpandMoreRounded />
                </IconButton>

              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Grid container style={{ marginTop: 10 }} alignItems={"center"} direction={"column"} className={classes.albumCover}>
          <Grid item >
            <Fade in={true}>
              <div><Button style={{ ...cardStyle, background: `url(${HOST_API}/${player && player.currentTrack && player.currentTrack.track && player.currentTrack.track.cover}) center center / cover no-repeat` }}></Button></div>
            </Fade>
          </Grid>
          <Grid item>
            <Grid container direction={"column"} spacing={1}>
              <Grid item>
                <h1>{player && player.currentTrack && player.currentTrack.track && player.currentTrack.track.album_name}</h1>
              </Grid>
              <Grid item>
                <span><b>{player && player.currentTrack && player.currentTrack.track && `By  ${player.currentTrack.track.artist_name}`}</b></span>
                <br />
                <span>{player && player.currentTrack && player.currentTrack.track && player.currentTrack.track.tags.split(", ").map((tag, index) =>
                  <Chip onClick={handleClose} component={NavLink} key={index} to={`/albums/${tag}`} color={"secondary"} style={{ borderRadius: 0, cursor: "pointer", marginRight: 2, padding: 0, height: 20 }} label={tag} />
                )}</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}