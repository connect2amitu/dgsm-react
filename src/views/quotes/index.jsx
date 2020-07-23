import React from 'react'
import { getQuotes, clearQuote } from '../../actions/quotes';
import { Button, Grid, CircularProgress, Typography } from '@material-ui/core';
import { playStopButtonClickHandler } from '../../shared/funs';
import { Fade } from '@material-ui/core';
import classes from '../../assets/css/track.module.scss';
import { MAIN_CATEGORY } from '../../shared/constants';
import { NavLink } from 'react-router-dom';



var cardStyle = {
  borderRadius: "10px",
  height: "130px",
  width: "130px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  objectFit: "contain"
}


class Quote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trackIndex: null,
      size: 5,
      page: 0,
      content: 'quote'
    }
  }

  render() {
    return (
      <div className={classes.track}>
        <Grid container className={classes.heading}>
          <Grid item>
            <h1>Quotes</h1>
          </Grid>
        </Grid>
        <Grid container spacing={1} >
          {
            MAIN_CATEGORY.map((main, index) =>
              <Grid item xs={6} sm={3} md={"auto"}>
                <Grid container direction={"column"} style={{ padding: "10px", margin: "0 auto", textAlign: "center" }}>
                  <Grid item>
                    <NavLink to={`/quotes/${main.slug}/`}>
                      <Button style={{ ...cardStyle, background: `url(${require(`../../assets/images/dgsm/${main.slug}.jpg`)}) center center / cover no-repeat` }}></Button>
                    </NavLink>
                  </Grid>
                  <Grid item>
                    <Typography variant={"body1"}>{main.name}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            )

          }
          <Grid item xs={6} sm={3} md={"auto"}>
            <Grid container direction={"column"} style={{ padding: "10px", margin: "0 auto", textAlign: "center" }}>
              <Grid item>
                <NavLink to={`/quotes/others`}>
                  <Button style={{ ...cardStyle, background: `url(${require(`../../assets/images/dgsm/others.png`)}) center center / cover no-repeat` }}></Button>
                </NavLink>
              </Grid>
              <Grid item>
                <Typography variant={"body1"}>Others</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </div>
    );
  }
}



export default Quote

