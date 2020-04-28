import React from 'react'
import Header from './Header'
import { Container, styled, CircularProgress, Backdrop } from '@material-ui/core'
import Player from '../Player'
import { connect } from 'react-redux';


const MyContainer = styled(Container)({
  paddingBottom: "90px",
  paddingTop: "10px",
});


function Layout({ children, isLoading_tracks, isLoading_albums, isLoading_player }) {
  return (
    <div>
      {/* <Backdrop style={{ zIndex: 9999 }} open={isLoading_tracks || isLoading_albums || isLoading_player}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <Header />
      <MyContainer maxWidth={false} fixed={true}>
        {children}
      </MyContainer>
      <Player />
    </div >
  )
}
const mapStateToProps = state => {
  return {
    isLoading_tracks: state.tracks.isLoading,
    isLoading_albums: state.albums.isLoading,
    isLoading_player: state.player.isLoading,
  }
}
export default connect(mapStateToProps)(Layout)
