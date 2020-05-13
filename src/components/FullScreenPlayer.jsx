
import React, { useState, useEffect } from 'react';
import { Button, Dialog, IconButton, Slide, Grid, Fade, Chip, Tooltip, Menu, MenuItem } from '@material-ui/core';
import { MoreVertRounded, ExpandMoreRounded, SkipPreviousRounded, PauseCircleFilledRounded, PlayCircleFilledRounded, SkipNextRounded, RepeatOneRounded, RepeatRounded, VolumeOffRounded, VolumeUpRounded, QueueMusicRounded, MoreHorizRounded } from '@material-ui/icons';
import { HOST_API } from '../shared/constants';
import { removeExt, display } from '../shared/funs';
import classes from '../assets/css/player.module.scss';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { RangeSlider } from './Slider';
import { Scrollbars } from 'react-custom-scrollbars';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function FullScreenPlayer(props) {
  const [open, setOpen] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const { player, disabled, isActiveActionBtn, prevSong, nextSong, muteHandler, handlePlaylistSidebar, playPause, openPlaylist, openPlaylistModal, closeMenu, anchorEl, handleClick } = props;

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
  const tags = _.get(player, "currentTrack.track.tags", "").split(", ");
  // const tags = [];
  const lyrics = _.get(player, 'currentTrack.track.lyrics', false)

  return (
    <div>
      <IconButton disabled={disabled} onClick={() => { handleClickOpen(); setShowLyrics(false) }} color={"inherit"}><MoreVertRounded /></IconButton>
      <Dialog fullScreen open={open} onClose={() => { handleClickOpen(); setShowLyrics(false) }} TransitionComponent={Transition} className={classes.dialogbox}>
        <div style={{ backgroundImage: `url(${HOST_API}/${_.get(player, 'currentTrack.track.cover')})` }} className={classes.blurBg}>

          <Grid container alignItems={"center"} className={classes.albumDetail}>
            <Grid item className={classes.closeBtn} xs={12}>
              <IconButton style={{ justifyContent: "flex-end" }} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <ExpandMoreRounded />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems={"center"} direction={"column"}>
                <Grid item xs={12}>
                  <Fade in={true}>
                    <div><Button className={classes.cover} style={{
                      background: `url(${HOST_API}/${_.get(player, 'currentTrack.track.cover', false)}) center center / cover no-repeat`
                    }}></Button></div>
                  </Fade>
                </Grid>
                <Grid item xs={12}>
                  <h1 className={classes.trackName}>{removeExt(_.get(player, 'currentTrack.track.name', "n/a"))}</h1>
                </Grid>
                <Grid item xs={12}>
                  <span><b>{_.get(player, 'currentTrack.track', false) && `By  ${_.get(player, 'currentTrack.track.artist_name', "n/a")}`}</b></span>
                </Grid>
                <Grid item xs={12}>
                  <span>
                    {
                      tags.map((tag, index) =>
                        <Chip
                          className={classes.tags}
                          onClick={handleClose}
                          component={NavLink}
                          key={index}
                          to={`/albums/${tag}`}
                          color={"secondary"}
                          style={{ borderRadius: 0, cursor: "pointer", marginRight: 2, padding: 0, height: 20 }}
                          label={tag}
                        />
                      )
                    }
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Scrollbars autoHide autoHeight={true} autoHeightMin={0} style={{ width: "100%", height: 150, autoHeightMin: 150 }}>
                <pre style={{ paddingBottom: 44 }}>
                  {lyrics}
                </pre>
              </Scrollbars>
            </Grid>
            <Grid item xs={12} className={classes.playerAction}>
              <Grid container alignItems={"center"} spacing={1}>
                <Grid item xs={12} className={classes.slider}>
                  <RangeSlider  {...props} />
                  <div className={classes.leftDuration}>{display(player.currentTime)}</div>
                  <div className={classes.rightDuration}>{display(player.durationTime)}</div>
                </Grid>
                <Grid item xs={12} className={classes.playlistIcon}>
                  <Grid container alignItems={"center"} justify={"flex-end"} spacing={1}>
                    <Grid item >
                      <Tooltip title={"Open Playlist"} placement="top">
                        <IconButton
                          onClick={() => handlePlaylistSidebar(!openPlaylist)} color={"inherit"}>
                          <QueueMusicRounded style={{ fontSize: "2rem" }} />
                        </IconButton>
                      </Tooltip>
                    </Grid>

                    <Grid item>
                      <IconButton
                        disabled={isActiveActionBtn}
                        onClick={handleClick} color={"inherit"}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                      >
                        <MoreHorizRounded />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                      >
                        <MenuItem onClick={openPlaylistModal}>Add to playlist</MenuItem>
                        <MenuItem onClick={closeMenu}>Share</MenuItem>
                        <MenuItem onClick={closeMenu}>View Lyrics</MenuItem>
                      </Menu>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1} alignItems={"center"} justify={"space-evenly"}>
                    <Grid item>
                      <Tooltip title={"Previous"} placement="top">
                        <IconButton
                          disabled={isActiveActionBtn}
                          onClick={() => prevSong()} color={"inherit"}>
                          <SkipPreviousRounded style={{ fontSize: "2rem" }} />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title={player.currentTrack.track !== null ? player.isPlaying ? "Pause" : "Play" : "Select track"} placement="top">
                        <IconButton edge="start" color="inherit"
                          disabled={isActiveActionBtn}
                          onClick={() => playPause()}>
                          {player.isPlaying ? <PauseCircleFilledRounded style={{ fontSize: "3rem" }} /> : <PlayCircleFilledRounded style={{ fontSize: "3rem" }} />}
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title={"Next"} placement="top">
                        <IconButton
                          disabled={isActiveActionBtn}
                          onClick={() => nextSong()} color={"inherit"}>
                          <SkipNextRounded style={{ fontSize: "2rem" }} />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item className={classes.muteIcon}>
                      <Tooltip title={player.isMuted ? "Unmute" : "Mute"} placement="top">
                        <IconButton
                          disabled={isActiveActionBtn}
                          onClick={() => muteHandler()} color={"inherit"}>
                          {player.isMuted ? <VolumeOffRounded /> : <VolumeUpRounded />}
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item className={classes.playlistIcon}>
                      <Tooltip title={"Repeat One"} placement="top">
                        <IconButton > <RepeatOneRounded style={{ fontSize: "2rem" }} />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div >
  );
}