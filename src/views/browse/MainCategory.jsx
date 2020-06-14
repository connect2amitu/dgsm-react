import React, { Component } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import classes from '../../assets/css/album.module.scss';
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


class MainCategory extends Component {
  render() {
    const { isLoading, error } = this.props
    return (
      <div className={classes.album}>
        <Grid container justify={"space-between"} className={classes.heading}>
          <Grid item>
            <h1>DGSM</h1>
          </Grid>
        </Grid>
        {!isLoading && error && <Error />}
        {!isLoading ?
          <Grid container spacing={1} >
            <Grid item xs={6} sm={6} md={3}>
              <Grid container direction={"column"} style={{ padding: "10px", margin: "0 auto", textAlign: "center" }}>
                <Grid item>
                  <NavLink to="browse/dada-bhagwan"><Button style={{ ...cardStyle, background: `url('https://gogreen-nursery.com/dgsm/uploads/albumCovers/cover.jpg') center center / cover no-repeat` }}></Button></NavLink>
                </Grid>
                <Grid item>
                  <Typography variant={"body1"}>{"DADA BHAGWAN"}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <Grid container direction={"column"} style={{ padding: "10px", margin: "0 auto", textAlign: "center" }}>
                <Grid item>
                  <NavLink to="browse/geeta-bhagwan"><Button style={{ ...cardStyle, background: `url('https://gogreen-nursery.com/dgsm/uploads/albumCovers/cover1.jpg') center center / cover no-repeat` }}></Button></NavLink>
                </Grid>
                <Grid item>
                  <Typography variant={"body1"}>{"GEETA BHAGWAN"}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <Grid container direction={"column"} style={{ padding: "10px", margin: "0 auto", textAlign: "center" }}>
                <Grid item>
                  <NavLink to="browse/shyam-bhagwan"><Button style={{ ...cardStyle, background: `url('https://gogreen-nursery.com/dgsm/uploads/albumCovers/cover2.jpg') center center / cover no-repeat` }}></Button></NavLink>
                </Grid>
                <Grid item>
                  <Typography variant={"body1"}>{"SHYAM BHAGWAN"}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <Grid container direction={"column"} style={{ padding: "10px", margin: "0 auto", textAlign: "center" }}>
                <Grid item>
                  <NavLink to="browse/meera-bhagwan"><Button style={{ ...cardStyle, background: `url('https://gogreen-nursery.com/dgsm/uploads/albumCovers/cover3.jpg') center center / cover no-repeat` }}></Button></NavLink>
                </Grid>
                <Grid item>
                  <Typography variant={"body1"}>{"MEERA BHAGWAN"}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          : <Loading />
        }
      </div>
    )
  }
  componentDidMount() {
  }

}


const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(MainCategory)
