import React, { Component } from 'react'
import TopAlbums from './TopAlbums';
import TopTracks from './TopTracks';


export default class Browse extends Component {
  render() {
    return (
      <div>
        <TopAlbums />
        <TopTracks />
      </div>
    )
  }
}
