import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Teams from './teams';
import Matches from './matches';
import Leaderboard from './leaderboard';
import { persistor } from './store';
import Notification from './notification';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav">
          <Link to="/teams">Teams</Link>
          <Link to="/matches">Matches</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </div>
        <Switch>
          <Route exact path={['/teams', '/']}>
            <Teams />
          </Route>
          <Route path='/matches'>
            <Matches />
          </Route>
          <Route path='/leaderboard'>
            <Leaderboard />
          </Route>
        </Switch>
        {/* <button onClick={() => {
          persistor.purge();
        }}>Clear persistor</button> */}
        <Notification />
      </div>
    </BrowserRouter>
  );
}

export default App;
