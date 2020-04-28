import React from 'react'
import { Grid, Button } from '@material-ui/core'
import PlayPauseButton from './PlayPauseButton';


var trackStyle = {
  borderRadius: "10px",
  background: `url("http://localhost/dgsm/uploads/albumCovers/cover27.jpg")`,
  height: "60px",
  width: "60px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

export default function SongCard({ track, player, playSong, pauseSong }) {

  return (
    <Grid container>
      <Grid item xs={2}><Button style={trackStyle} /></Grid>
      <Grid item xs={8}>
        <Grid container direction={"column"}>
          <Grid item>
            {/* <span>{track.name}</span> */}
            <Grid container direction={"column"}>
              <Grid item>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{track.name}</span>
              </Grid>
              <Grid item>
                <span style={{ fontSize: 12 }}>{track.album_name} {track.city_name && `(${track.city_name})`}</span>
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
