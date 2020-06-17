import React from 'react'
import { CircularProgress, Grid } from '@material-ui/core'

export default function Loading() {
  return (
    <Grid container justify={"center"}>
      <Grid>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}
