import React from 'react'
import { Button } from '@material-ui/core'
import { PauseCircleFilledRounded, PlayCircleFilledOutlined } from '@material-ui/icons'

export default function PlayPauseButton({ track, pauseSong, playSong, isPlaying, currentTrack }) {
  return (
    <>
      {currentTrack.track && currentTrack.track.id === track.id && isPlaying ? <Button
        onClick={() => pauseSong()}
        color={"secondary"} >
        <PauseCircleFilledRounded style={{ fontSize: 30 }} />
      </Button> :
        <Button
          onClick={() => playSong(track)}
          color={"primary"}
        >
          <PlayCircleFilledOutlined style={{ fontSize: 30 }} />
        </Button>}
    </>
  )
}
