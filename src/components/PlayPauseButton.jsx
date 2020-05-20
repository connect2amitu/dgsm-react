import React from 'react'
import { IconButton } from '@material-ui/core'
import { PauseCircleFilledRounded, PlayCircleFilledOutlined } from '@material-ui/icons'

export default function PlayPauseButton({ track, pauseSong, playSong, isPlaying, currentTrack, size = 30 }) {
  return (
    <>
      {currentTrack.track && currentTrack.track.id === track.id && isPlaying ?
        <IconButton
          onClick={() => pauseSong()}
          color={"secondary"} >
          <PauseCircleFilledRounded style={{ fontSize: size }} />
        </IconButton> :
        <IconButton
          onClick={() => playSong(track)}
          color={"primary"}
        >
          <PlayCircleFilledOutlined style={{ fontSize: size }} />
        </IconButton>
      }
    </>
  )
}
