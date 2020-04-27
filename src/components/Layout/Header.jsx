import React from 'react'
import { AppBar, Toolbar, Button, Grid, Typography } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justify={"space-between"}>
            <Grid item>
              <Typography variant="h6" component={NavLink} to={"/"} color={"inherit"} style={{ textDecoration: "none" }} > DGSM </Typography>
            </Grid>
            <Grid item>
              <Button component={NavLink} to={"/browse"} color="inherit">Browse</Button>
              {/* <Button component={NavLink} to={"/bhajans"} color="inherit">Bhajan</Button> */}
              {/* <Button component={NavLink} to={"/albums"} color="inherit">Albums</Button>
              <Button component={NavLink} to={"/latest"} color="inherit">Latest</Button> */}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
