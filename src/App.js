import React from 'react';
import Layout from './components/Layout/Index';
import Tracks from './views/tracks';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Albums from './views/albums';
import Browse from './views/browse';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/(|browse)" component={Browse} />
          <Route exact path="/browse/tracks" component={Tracks} />
          <Route exact path="/browse/albums" render={() => <h1>Album more</h1>} />
          <Route exact path="/albums" component={Albums} />
          <Route exact path="/latest" render={() => <h1>Latest</h1>} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
