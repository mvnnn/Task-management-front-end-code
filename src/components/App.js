import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/projectActions';

class App extends Component {
  constructor(props) {
   super(props);
   this.state={
     showModal: false,
     total_user:[],
     item_no: 0
   }
  }
  render() {
    const { projects, isFetching } = this.props.projects;
    return (
      <div>
        <h1>
          To get started, edit.
        </h1>
        {
          isFetching ? (
    projects.map((project, i) => {
      return <div>
        <p>{project.task_title}</p>
      </div>
    })
      ) : null
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // console.log(state.projects);
    return {
      projects: state.projects
    }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
