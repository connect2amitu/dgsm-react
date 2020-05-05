import React from 'react'
import { IconButton } from '@material-ui/core'
import { PauseCircleFilledRounded, PlayCircleFilledOutlined } from '@material-ui/icons'

export default function PlayPauseButton({ track, pauseSong, playSong, isPlaying, currentTrack }) {
  return (
    <>
      {currentTrack.track && currentTrack.track.id === track.id && isPlaying ?
        <IconButton
          onClick={() => pauseSong()}
          color={"secondary"} >
          <PauseCircleFilledRounded style={{ fontSize: 30 }} />
        </IconButton> :
        <IconButton
          onClick={() => playSong(track)}
          color={"primary"}
        >
          <PlayCircleFilledOutlined style={{ fontSize: 30 }} />
        </IconButton>
      }
    </>
  )
}
