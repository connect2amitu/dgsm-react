import React, { useEffect } from 'react'
import Header from './Header'
import { Container, styled, } from '@material-ui/core'
import Player from '../Player'
import { withRouter } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga';

const MyContainer = styled(Container)({
  paddingBottom: "90px",
  paddingTop: "10px",
});


function Layout({ history, children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }, [pathname]);

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
