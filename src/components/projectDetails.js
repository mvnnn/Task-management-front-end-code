import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import createHistory from 'history/createBrowserHistory'

// const history = createHistory();
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import Container from './Container';
// import AddMember from './addMember';
// import CreateTask from './createTask';
import ProjectTasks from './projectTasks';
// import * as actions from '../actions/projectActions';

let styles = {
  grid: {
    width: '100%',
    margin: "2px auto",
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden',
    verticalAlign: 'text-top'
  }
}

class projectDetails extends Component {
  constructor(props) {
   super(props);
   this.state={
     membersTask: []
   }
  }

  componentDidMount(){
    this.setState({
      membersTask: this.props.location.state.members_task
    })
    console.log(this.props.location.state.members_task);
    console.log(this.props.projects);
  }

  render() {
    let members_data = this.state.membersTask;

    return (
      <div style={styles.grid}>
        <ProjectTasks membersData={members_data} projectTitle={this.props.location.state.project_title}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(projectDetails);
