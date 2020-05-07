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

import React, { useState, useEffect } from 'react';
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

}


export default function FullScreenPlayer(props) {
  const [open, setOpen] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const { player, disabled } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    return () => {
      setShowLyrics(false);
    };
  }, []);


  return (
    <div>
      <IconButton disabled={disabled} onClick={handleClickOpen} color={"inherit"}><MoreVertRounded /></IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} className={classes.dialogbox}>
        <div style={{ backgroundImage: `url(${HOST_API}/${player && player.currentTrack && player.currentTrack.track && player.currentTrack.track.cover})` }} className={classes.blurBg}>

          <Grid container alignItems={"center"} direction={"column"} style={{ height: showLyrics && "auto" }} className={classes.albumDetail}>
            <Grid item className={classes.closeBtn}>
              <IconButton style={{ justifyContent: "flex-end" }} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <ExpandMoreRounded />
              </IconButton>
            </Grid>
            <Grid item >
              <Fade in={true}>
                <div><Button className={classes.cover} style={{
                  background: `url(${HOST_API}/${player && player.currentTrack && player.currentTrack.track && player.currentTrack.track.cover}) center center / cover no-repeat`
                }}></Button></div>
              </Fade>
            </Grid>
            <Grid item>
              <Grid container direction={"column"} alignItems={"center"} spacing={1}>
                <Grid item xs={12}>
                  <h1>{player && player.currentTrack && player.currentTrack.track && player.currentTrack.track.album_name}</h1>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction={"column"} alignItems={"center"} spacing={1}>
                    <Grid item xs={12}>
                      <span><b>{player && player.currentTrack && player.currentTrack.track && `By  ${player.currentTrack.track.artist_name}`}</b></span>
                    </Grid>
                    <Grid item xs={12}>
                      <span>{player && player.currentTrack && player.currentTrack.track && player.currentTrack.track.tags.split(", ").map((tag, index) =>
                        <Chip onClick={handleClose} component={NavLink} key={index} to={`/albums/${tag}`} color={"secondary"} style={{ borderRadius: 0, cursor: "pointer", marginRight: 2, padding: 0, height: 20 }} label={tag} />
                      )}</span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {player && player.currentTrack && player.currentTrack.track && player.currentTrack.track && player.currentTrack.track.lyrics.length > 0 ?
                    <>
                      <span onClick={() => setShowLyrics(!showLyrics)}>{showLyrics ? `Hide` : `Show`} lyrics</span>
                      {showLyrics && <pre>
                        {player && player.currentTrack && player.currentTrack.track && player.currentTrack.track.lyrics}
                      </pre>}
                    </>
                    :
                    <span >No lyrics available</span>
                  }

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div >
  );
}