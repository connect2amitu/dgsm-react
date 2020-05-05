import React from 'react'
import classes from '../assets/css/album.module.scss'
import { Button, Grid, Typography } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { HOST_API } from '../shared/constants'

export default function AlbumCard({ name, cover, slug }) {
  return (
    <Grid container className={classes.albumCard}>
      <Grid item xs={12}>
        <NavLink to={`/album/${slug}`}><Button className={classes.cover} style={{ background: `url(${HOST_API}/${cover}) center center / cover no-repeat` }}></Button></NavLink>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={"body1"}>{name}</Typography>
      </Grid>
    </Grid>
  )
}
