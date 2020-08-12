import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Backdrop, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import { GOOGLE_ANALYTICS_ID } from './shared/constants'
import { darkTheme, theme } from './theme';

// import Layout from './components/Layout/Index';
// import Tracks from './views/tracks/Index';
// import Albums from './views/albums/Index';
// import Browse from './views/browse/Index';
// import AlbumsDetail from './views/albums/Detail';
// import MyPlaylist from './views/playlist/Index';
// import MyPlaylistDetail from './views/playlist/Detail';

const Layout = React.lazy(() => import('./components/Layout'));
const Tracks = React.lazy(() => import('./views/tracks'));
const Vanis = React.lazy(() => import('./views/vani'));
const Albums = React.lazy(() => import('./views/albums'));
const Browse = React.lazy(() => import('./views/browse'));
const Quotes = React.lazy(() => import('./views/quotes'));
const AlbumsDetail = React.lazy(() => import('./views/albums/Detail'));
const MyPlaylist = React.lazy(() => import('./views/playlist'));
const MyPlaylistDetail = React.lazy(() => import('./views/playlist/Detail'));
const MainCategory = React.lazy(() => import('./views/mainCategory'));
const MainCategoryBhajan = React.lazy(() => import('./views/mainCategory/Bhajan'));
const MainCategoryVani = React.lazy(() => import('./views/mainCategory/Vani'));
const MainCategoryQuote = React.lazy(() => import('./views/mainCategory/Quote'));
const MainCategoryJivani = React.lazy(() => import('./views/mainCategory/Jivani'));
const Page404 = React.lazy(() => import('./components/404'));
const Contact = React.lazy(() => import('./views/contact'));

// console.log(`%c
// ██████╗  ██████╗ ███████╗███╗   ███╗\r
// ██╔══██╗██╔════╝ ██╔════╝████╗ ████║\r
// ██║  ██║██║  ███╗███████╗██╔████╔██║\r
// ██║  ██║██║   ██║╚════██║██║╚██╔╝██║\r
// ██████╔╝╚██████╔╝███████║██║ ╚═╝ ██║\r
// ╚═════╝  ╚═════╝ ╚══════╝╚═╝     ╚═╝`,
//   'background: #222; color: #e38461');


const initReactGA = () => {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, { debug: true });
}
function App({ isDark }) {
  useEffect(() => {
    initReactGA();
  }, [])
  return (
    <BrowserRouter
    // basename="/dgsmsg"
    >
      <ThemeProvider theme={isDark ? darkTheme : theme}>
        <CssBaseline />

        <Suspense fallback={<Backdrop open={true}> <CircularProgress color="inherit" /> </Backdrop>}>
          <Layout>
            <Switch>
              <Route exact path="/(|browse)" component={Browse} />
              <Route exact path="/quotes" component={Quotes} />
              <Route exact path="/quotes/(dada-bhagwan|geeta-bhagwan|shyam-bhagwan|meera-bhagwan|others)" component={MainCategoryQuote} />
              <Route exact path="/browse/tracks/:aZ?" component={Tracks} />
              <Route exact path="/browse/vanis" component={Vanis} />
              <Route exact path="/browse/(dada-bhagwan|geeta-bhagwan|shyam-bhagwan|meera-bhagwan)" component={MainCategory} />
              <Route exact path="/browse/(dada-bhagwan|geeta-bhagwan|shyam-bhagwan|meera-bhagwan)/bhajan" component={MainCategoryBhajan} />
              <Route exact path="/browse/(dada-bhagwan|geeta-bhagwan|shyam-bhagwan|meera-bhagwan)/vani" component={MainCategoryVani} />
              <Route exact path="/browse/(dada-bhagwan|geeta-bhagwan|shyam-bhagwan|meera-bhagwan)/quote" component={MainCategoryQuote} />
              <Route exact path="/browse/(dada-bhagwan|geeta-bhagwan|shyam-bhagwan|meera-bhagwan)/jivani" component={MainCategoryJivani} />
              <Route exact path="/browse/albums/(vani|bhajan|all)?" component={Albums} />
              <Route exact path="/albums/:search?" component={Albums} />
              <Route exact path="/my-playlist" component={MyPlaylist} />
              <Route exact path="/my-playlist/:id" component={MyPlaylistDetail} />
              <Route exact path="/album/:slug" component={AlbumsDetail} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="*" component={Page404} />
            </Switch>
          </Layout>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    isDark: state.global.isDark
  }
}

export default connect(mapStateToProps)(App)
