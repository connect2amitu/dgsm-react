import React, { Component } from 'react'
import TopAlbums from './TopAlbums';
import TopTracks from './TopTracks';
import MainCategory from './MainCategory';
import TopVani from './TopVani';
import Meta from '../../components/SEO';


export default class Browse extends Component {
  render() {
    return (
      <div>
        <Meta title={`DGSM`} description={`Browse | DGSM`} />
        <MainCategory />
        <TopAlbums />
        <TopTracks />
        <TopVani />
      </div>
    )
  }
}
