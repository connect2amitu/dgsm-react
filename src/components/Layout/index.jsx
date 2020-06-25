import React from 'react'
import Header from './Header'
import { Container, styled, } from '@material-ui/core'
import Player from '../Player'

const MyContainer = styled(Container)({
  paddingBottom: "90px",
  paddingTop: "10px",
});


function Layout({ children }) {
  return (
    <div>
      <Header />
      <MyContainer maxWidth={false} fixed={true}>
        {children}
      </MyContainer>
      <Player />
    </div >
  )
}

export default Layout
