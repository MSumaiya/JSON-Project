import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import MainOne from './main'

const SomethingElse = () => <div>Something Else</div>
export default function App(){
  return (
  <Router>
    <div>
      <Link to="/">Home</Link>{' '}
      <Switch>
        <Route exact path="/" component={MainOne} />
        <Route exact path="/data" component={SomethingElse} />
      </Switch>
      </div>
  </Router>)
  
}