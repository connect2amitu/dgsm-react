import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import PlayPauseButton from './PlayPauseButton';
import { NavLink } from 'react-router-dom';
import { removeExt } from '../shared/funs';
import classes from '../assets/css/track.module.scss';

export default function SongCard({ track, player, playSong, pauseSong }) {

  return (
    <Grid container>
      <Grid item xs={2} className={classes.trackCard} ><Button className={classes.cover} /></Grid>
      <Grid item xs={8} className={classes.trackDetail}>
        <Grid container direction={"column"}>
          <Grid item>
            {/* <span>{track.name}</span> */}
            <Grid container direction={"column"}>
              <Grid item>
                <span className={classes.name}>{removeExt(track.name)}</span>
              </Grid>
              <Grid item>
                <Typography color={"inherit"} component={NavLink} to={`/album/${track.album_slug}`} variant={"caption"} style={{ fontSize: 12 }}>{track.album_name} {track.city_name && `(${track.city_name})`}</Typography>
                <br /><span className={classes.name}>{track.type}</span>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <PlayPauseButton
          track={track}
          pauseSong={pauseSong}
          playSong={playSong}
          isPlaying={player.isPlaying}
          currentTrack={player.currentTrack}
        />
      </Grid>
    </Grid>
  )
}
