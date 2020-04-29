import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import CarouselSlider from "react-slick";
import { connect } from 'react-redux';
import { getAlbums } from '../../actions/albums';
import { HOST_API } from '../../shared/constants';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/Loading';
import Error from '../../components/Error';



var cardStyle = {
  borderRadius: "10px",
  height: "150px",
  width: "150px",
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
      draggable: false
    };
    return (
      <div>
        <Grid container justify={"space-between"}>
          <Grid item>
            <h1>Top albums</h1>
          </Grid>
          <Grid item>
            <Button component={NavLink} to="/browse/albums" color={"primary"} variant={"contained"}>View more</Button>
          </Grid>
        </Grid>
        {
          !isLoading && error && <Error />
        }
        {!isLoading ? <Grid container style={{ backgroundColor: "", padding: "30px" }} spacing={1} justify={"flex-start"}>
          <CarouselSlider style={{ width: "100%" }} className="slider" {...settings}>
            {
              albums.map((album, index) =>
                <Grid container key={index} style={{ height: "210px", width: "210px", backgroundColor: "black", padding: "10px", margin: "10px" }}>
                  <NavLink to={`album/${album.slug}`}><Button style={{ ...cardStyle, background: `url(${HOST_API}/${album.cover}) center center / cover no-repeat` }} /></NavLink>
                  <p>{album.name}</p>
                </Grid>
              )
            }
          </CarouselSlider>
        </Grid> : <Loading />}
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

}


const mapStateToProps = state => {
  return {
    ...state.albums
  }
}

export default connect(mapStateToProps)(TopAlbums)
