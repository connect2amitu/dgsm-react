import React, { useEffect } from 'react'
import Header from './Header'
import { Container, styled, IconButton } from '@material-ui/core'
import Player from '../Player'
import { withRouter } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga';
import { KeyboardArrowUpRounded } from '@material-ui/icons';

const MyContainer = styled(Container)({
  paddingBottom: "90px",
  paddingTop: "10px",
});
const ScrollToTop = styled(KeyboardArrowUpRounded)({
  position: "fixed",
  right: "15px",
  bottom: "120px",
  background: "#ff9100",
  color: "#ffffff",
  borderRadius: "50%",
  cursor: "pointer",
  display: "none",
  fontSize: "2.5rem"
});



function Layout({ history, children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.scrollTo(0, 0);

    window.onscroll = function () { myFunction() };

    function myFunction() {
      // console.log('document.body.scrollTop =>', document.body.scrollTop);
      if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        document.getElementById("scrollToTop").style.display = "block"
      } else {
        document.getElementById("scrollToTop").style.display = "none"
      }
    }

  }, [pathname]);

  return (
    <div>
      <Header />
      <MyContainer maxWidth={false} fixed={true}>
        {children}
      </MyContainer>
      <IconButton>
        <ScrollToTop id="scrollToTop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}></ScrollToTop>
      </IconButton>
      <Player />
    </div >
  )
}

export default withRouter(Layout)
