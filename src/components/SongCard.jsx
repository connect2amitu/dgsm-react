import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import PlayPauseButton from './PlayPauseButton';
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom';


var trackStyle = {
  borderRadius: "10px",
  background: `url(${logo})`,
  height: "60px",
  width: "60px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

export default function SongCard({ track, player, playSong, pauseSong }) {
  console.log('track =>', track);


  return (
    <Grid container>
      <Grid item xs={2}><Button style={trackStyle} /></Grid>
      <Grid item xs={8}>
        <Grid container direction={"column"}>
          <Grid item>
            {/* <span>{track.name}</span> */}
            <Grid container direction={"column"}>
              <Grid item>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{track.name.replace(/\.[^.]*$/, '')}</span>
              </Grid>
              <Grid item>
                <Typography color={"inherit"} component={NavLink} to={`/album/${track.album_slug}`} variant={"caption"} style={{ fontSize: 12 }}>{track.album_name} {track.city_name && `(${track.city_name})`}</Typography>
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
