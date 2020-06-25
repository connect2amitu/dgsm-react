import React, { Component } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import classes from '../../assets/css/album.module.scss';
import { NavLink } from 'react-router-dom';
import { getDGSMBrowse } from '../../actions/browse';


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
    const { isLoading, error, dgsmMain } = this.props;
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
            {
              dgsmMain.map((main, index) =>
                <Grid item xs={6} sm={3} md={"auto"}>
                  <Grid container direction={"column"} style={{ padding: "10px", margin: "0 auto", textAlign: "center" }}>
                    <Grid item>
                      <NavLink to={`browse/${main.slug}`}>
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
          </Grid>
          : <Loading />
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.dispatch(getDGSMBrowse())
  }

}

const mapStateToProps = state => {
  return {
    dgsmMain: state.browse.dgsmMain,
    isLoading: state.browse.isLoading,
    error: state.browse.error
  }
}

export default connect(mapStateToProps)(MainCategory)
