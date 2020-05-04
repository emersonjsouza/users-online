import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './containers/home';

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
