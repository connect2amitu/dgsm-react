import React from 'react';
import Layout from './components/Layout/Index';
import Tracks from './views/tracks/Index';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Albums from './views/albums/Index';
import Browse from './views/browse/Index';
import AlbumsDetail from './views/albums/Detail';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/(|browse)" component={Browse} />
          <Route exact path="/browse/tracks" component={Tracks} />
          <Route exact path="/browse/albums" render={() => <h1>Album more</h1>} />
          <Route exact path="/albums" component={Albums} />
          <Route exact path="/album/:slug" component={AlbumsDetail} />
          <Route exact path="/latest" render={() => <h1>Latest</h1>} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
