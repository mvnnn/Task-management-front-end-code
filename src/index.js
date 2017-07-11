// import ReactDOM from 'react-dom';

/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { HashRouter as Router, Route } from 'react-router-dom';
// import routes from './routes';
import ProjectDetails from './components/projectDetails';
import TaskManagement from './components/taskManagement';
import {loadProjects} from './actions/projectActions';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

store.dispatch(loadProjects());

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div>
        <Route path="/project" component={TaskManagement} />
        <Route path="/projectDetails/:task" component={ProjectDetails} />
    </div>
  </Router>
  </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
