import React, { useEffect } from 'react'
import Header from './Header'
import { Container, styled, } from '@material-ui/core'
import Player from '../Player'
import { withRouter } from 'react-router-dom';

const MyContainer = styled(Container)({
  paddingBottom: "90px",
  paddingTop: "10px",
});


function Layout({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  });
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

export default withRouter(Layout)
