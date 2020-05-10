import React from 'react';
import Layout from './components/Layout/Index';
import Tracks from './views/tracks/Index';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Albums from './views/albums/Index';
import Browse from './views/browse/Index';
import AlbumsDetail from './views/albums/Detail';
import MyPlaylist from './views/playlist/Index';
import MyPlaylistDetail from './views/playlist/Detail';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  //  green, purple, amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, grey, indigo, red,
  teal, orange,
} from '@material-ui/core/colors';


var darkTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange,
    type: "dark"
  },
});
var theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange
  },
});
darkTheme = responsiveFontSizes(darkTheme);
theme = responsiveFontSizes(theme);


function App({ isDark }) {
  return (
    <BrowserRouter basename="/dgsmsg">
      <ThemeProvider theme={isDark ? darkTheme : theme}>
        <CssBaseline />
        <Switch>
          <Layout>
            <Route exact path="/(|browse)" component={Browse} />
            <Route exact path="/browse/tracks" component={Tracks} />
            <Route exact path="/browse/albums" component={Albums} />
            <Route exact path="/albums/:search?" component={Albums} />
            <Route exact path="/my-playlist" component={MyPlaylist} />
            <Route exact path="/my-playlist/:id" component={MyPlaylistDetail} />
            <Route exact path="/album/:slug" component={AlbumsDetail} />
            <Route exact path="/latest" render={() => <h1>Latest</h1>} />
          </Layout>
        </Switch>
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


