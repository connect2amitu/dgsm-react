import React, { Component } from 'react'
import { Grid, Fade, Button } from '@material-ui/core';
import { find } from 'lodash';
import { MAIN_CATEGORY } from '../../shared/constants';
import { NavLink } from 'react-router-dom';

var trackStyle = {
  borderRadius: "10px",
  height: "150px",
  width: "150px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

export default class MainCategoryDetail extends Component {
  render() {
    return (
      <>
        <Grid container spacing={2} alignItems={"center"} direction={"column"}>
          <Grid item>
            <Fade in={true}>
              <div><Button style={{ ...trackStyle, backgroundImage: `url('https://gogreen-nursery.com/dgsm/uploads/dgsm/${this.props.match.params[0]}.jpg')` }}></Button></div>
            </Fade>
          </Grid>
          <Grid item>
            <h1>{find(MAIN_CATEGORY, { 'slug': this.props.match.params[0] }).name}</h1>
          </Grid>
          <Grid item>
            <Grid container spacing="1">
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/vani`} disabled={true} variant="contained" color="primary">Vani</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/bhajan`} disabled={false} variant="contained" color="primary">Bhajan</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/image`} disabled={true} variant="contained" color="primary">Image</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/e-book`} disabled={true} variant="contained" color="primary">E-Book</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/video`} disabled={true} variant="contained" color="primary">Video</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  }
}
