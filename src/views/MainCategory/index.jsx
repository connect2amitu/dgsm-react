import React, { Component } from 'react'
import { Grid, Fade, Button } from '@material-ui/core';
import { find } from 'lodash';
import { MAIN_CATEGORY } from '../../shared/constants';
import { NavLink } from 'react-router-dom';
import classes from '../../assets/css/maincategory.module.scss';
import Meta from '../../components/SEO';

var trackStyle = {
  borderRadius: "10px",
  height: "180px",
  width: "180px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

export default class MainCategoryDetail extends Component {
  render() {
    const slug = this.props.match.params[0];
    var data = find(MAIN_CATEGORY, { 'slug': slug });
    return (
      <div className={classes.mainCategory}>
        <Meta title={`${data.name} | DGSM`} description={`Divine ${data.name} Bhajans, Vani, Quotes, Jivani`} url={`https://admin.dgsm.in/uploads/dgsm/${slug}.jpg`} />
        <Grid container spacing={2} direction={"column"} alignItems={"center"} className={classes.container}>
          <Grid item className={classes.albumCard}>
            <Fade in={true}>
              <div><Button className={classes.cover} style={{ ...trackStyle, backgroundImage: `url(${data.image})` }}></Button></div>
            </Fade>
          </Grid>
          <Grid item className={classes.name}>
            <h1>{data.name}</h1>
          </Grid>
          <Grid item >
            <Grid className={classes.options} container spacing={2} justify={"center"}>
              <Grid item>
                <Button component={NavLink} to={`/browse/${slug}/bhajan`} disabled={false} variant="contained" color="primary">Bhajan</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${slug}/vani`} disabled={false} variant="contained" color="primary">Vani</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${slug}/quote`} disabled={false} variant="contained" color="primary">Quote</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${slug}/jivani`} disabled={false} variant="contained" color="primary">Jivani</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

}
