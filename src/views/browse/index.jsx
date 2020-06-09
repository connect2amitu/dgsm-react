import React, { Component } from 'react'
import TopAlbums from './TopAlbums';
import TopTracks from './TopTracks';
import MainCategory from './MainCategory';


export default class Browse extends Component {
  render() {
    return (
      <div>
        <MainCategory />
        <TopAlbums />
        <TopTracks />
      </div>
    )
  }
}
