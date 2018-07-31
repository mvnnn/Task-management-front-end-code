import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ProjectTasks from './projectTasks';

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
  render() {
    return (
      <div style={styles.grid}>
        <ProjectTasks membersData={this.props.location.state.members_task} projectTitle={this.props.location.state.project_title}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(projectDetails);
