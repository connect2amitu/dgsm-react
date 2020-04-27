import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { PauseCircleFilledRounded, PlayCircleFilledOutlined } from '@material-ui/icons'
import { playStopButtonClickHandler } from '../shared/funs';


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
        {
          player.currentTrack.track && player.currentTrack.track.id === track.id && player.isPlaying ?
            <Button
              onClick={() => pauseSong()}
              color={"primary"} >
              <PauseCircleFilledRounded />
            </Button> :
            <Button
              onClick={() => playSong(track)}
              color={"primary"} >
              <PlayCircleFilledOutlined />
            </Button>
        }
      </Grid>
    </Grid>
  )
}
