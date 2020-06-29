import React, { Component } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import CarouselSlider from "react-slick";
import { connect } from 'react-redux';
import { getAlbums, clearAlbums } from '../../actions/albums';
import { HOST_API } from '../../shared/constants';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import classes from '../../assets/css/album.module.scss';
import ViewMoreBtn from '../../components/ViewMoreBtn';



var cardStyle = {
  borderRadius: "10px",
  height: "130px",
  width: "130px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  objectFit: "contain"
}



class TopAlbums extends Component {
  render() {
    const { isLoading, albums, error } = this.props
    const settings = {
      infinite: false,
      speed: 800,
      slidesToShow: 10,
      slidesToScroll: 10,
      draggable: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 0
          }
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 0
          }
        },
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0
          }
        }
      ]
    };
    return (
      <div className={classes.album}>
        <Grid container justify={"space-between"} className={classes.heading}>
          <Grid item>
            <h1>Top Albums</h1>
          </Grid>
          <Grid item>
            <ViewMoreBtn to={"/browse/albums"} />
          </Grid>
        </Grid>
        {!isLoading && error && <Error />}
        {!isLoading ? <Grid container style={{ backgroundColor: "", padding: "30px", textAlign: "center" }} spacing={1} justify={"flex-start"}>
          <CarouselSlider style={{ width: "100%" }} className="slider" {...settings}>
            {
              albums.map((album, index) =>
                <Grid container direction={"column"} key={index} style={{ height: "210px", width: "210px", padding: "10px", margin: "10px" }}>
                  <Grid item>
                    <NavLink to={`/album/${album.slug}`}><Button style={{ ...cardStyle, background: `url(${HOST_API}/${album.cover}) center center / cover no-repeat` }}></Button></NavLink>
                  </Grid>
                  <Grid item>
                    <Typography variant={"caption"}>{album.name}</Typography>
                  </Grid>
                </Grid>
              )
            }
          </CarouselSlider>
        </Grid> : <Loading />
        }
      </div>
    )
  }
  componentDidMount() {
    var query = {
      size: 50,
      order: 'asc',
      page: 0
    }
    this.props.dispatch(getAlbums(query))
  }

  componentWillUnmount() {
    this.props.dispatch(clearAlbums());
  }

}


const mapStateToProps = state => {
  return {
    ...state.albums
  }
}

export default connect(mapStateToProps)(TopAlbums)
