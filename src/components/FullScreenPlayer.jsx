
import React, { useState, useEffect } from 'react';
import { Button, Dialog, IconButton, Slide, Grid, Fade, Chip } from '@material-ui/core';
import { MoreVertRounded, ExpandMoreRounded } from '@material-ui/icons';
import { HOST_API } from '../shared/constants';
import { removeExt } from '../shared/funs';
import classes from '../assets/css/player.module.scss';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


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
  const tags = _.get(player, "currentTrack.track.tags", "").split(", ");
  // const tags = [];
  return (
    <div>
      <IconButton disabled={disabled} onClick={handleClickOpen} color={"inherit"}><MoreVertRounded /></IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} className={classes.dialogbox}>
        <div style={{ backgroundImage: `url(${HOST_API}/${_.get(player, 'currentTrack.track.cover')})` }} className={classes.blurBg}>

          <Grid container alignItems={"center"} direction={"column"} style={{ height: _.get(player, 'currentTrack.track.lyrics', "").length && showLyrics ? "auto" : "100vh" }} className={classes.albumDetail}>
            <Grid item className={classes.closeBtn}>
              <IconButton style={{ justifyContent: "flex-end" }} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <ExpandMoreRounded />
              </IconButton>
            </Grid>
            <Grid item >
              <Fade in={true}>
                <div><Button className={classes.cover} style={{
                  background: `url(${HOST_API}/${_.get(player, 'currentTrack.track.cover', false)}) center center / cover no-repeat`
                }}></Button></div>
              </Fade>
            </Grid>
            <Grid item>
              <Grid container direction={"column"} alignItems={"center"} spacing={1}>
                <Grid item xs={12}>
                  <h1>{removeExt(_.get(player, 'currentTrack.track.name', "n/a"))}</h1>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction={"column"} alignItems={"center"} spacing={1}>
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
                <Grid item>
                  {_.get(player, 'currentTrack.track.lyrics', "").length > 0 ?
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