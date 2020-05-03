import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import PlayPauseButton from './PlayPauseButton';
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom';


var trackStyle = {
  borderRadius: "10px",
  background: `url(${logo})`,
  height: "200px",
  width: "200px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

export default function PlaylistCard({ name, id }) {

  return (
    <Grid container direction={"column"} alignItems={"center"}>
      <NavLink style={{ color: "inherit", textDecoration: "none", textAlign: "center" }} to={`/my-playlist/${id}`}>
        <Grid item>
          <Button style={trackStyle}></Button>
        </Grid>
        <Grid item>
          <Typography variant={"subtitle1"}>{name}</Typography>
        </Grid>
      </NavLink>
    </Grid >
  )
}
