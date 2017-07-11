import React from 'react';
// import { Route, IndexRoute } from 'react-router';
import { HashRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import TaskManagement from './components/taskManagement';

export default (
  <div>
  <Route path="/" component={App}>
    <Route path="/login" component={TaskManagement} />
  </Route>
</div>
);
