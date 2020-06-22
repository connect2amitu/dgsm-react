import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Backdrop, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { darkTheme, theme } from './theme';


// import Layout from './components/Layout/Index';
// import Tracks from './views/tracks/Index';
// import Albums from './views/albums/Index';
// import Browse from './views/browse/Index';
// import AlbumsDetail from './views/albums/Detail';
// import MyPlaylist from './views/playlist/Index';
// import MyPlaylistDetail from './views/playlist/Detail';

const Layout = React.lazy(() => import('./components/Layout/Index'));
const Tracks = React.lazy(() => import('./views/tracks/Index'));
const Vanis = React.lazy(() => import('./views/vani/Index'));
const Albums = React.lazy(() => import('./views/albums/Index'));
const Browse = React.lazy(() => import('./views/browse/Index'));
const AlbumsDetail = React.lazy(() => import('./views/albums/Detail'));
const MyPlaylist = React.lazy(() => import('./views/playlist/Index'));
const MyPlaylistDetail = React.lazy(() => import('./views/playlist/Detail'));
const MainCategory = React.lazy(() => import('./views/MainCategory/Index'));
const MainCategoryBhajan = React.lazy(() => import('./views/MainCategory/Bhajan'));
const MainCategoryVani = React.lazy(() => import('./views/MainCategory/Vani'));
const Page404 = React.lazy(() => import('./components/404'));

function App({ isDark }) {
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
              <Route exact path="/browse/tracks/:aZ?" component={Tracks} />
              <Route exact path="/browse/vanis" component={Vanis} />
              <Route exact path="/browse/(dada-bhagwan|geeta-bhagwan|shyam-bhagwan|meera-bhagwan)" component={MainCategory} />
              <Route exact path="/browse/(dada-bhagwan|geeta-bhagwan|shyam-bhagwan|meera-bhagwan)/bhajan" component={MainCategoryBhajan} />
              <Route exact path="/browse/(dada-bhagwan|geeta-bhagwan|shyam-bhagwan|meera-bhagwan)/vani" component={MainCategoryVani} />
              <Route exact path="/browse/albums" component={Albums} />
              <Route exact path="/albums/:search?" component={Albums} />
              <Route exact path="/my-playlist" component={MyPlaylist} />
              <Route exact path="/my-playlist/:id" component={MyPlaylistDetail} />
              <Route exact path="/album/:slug" component={AlbumsDetail} />
              <Route exact path="/latest" render={() => <h1>Latest</h1>} />
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


