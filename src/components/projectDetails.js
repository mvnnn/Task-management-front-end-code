import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Container from './Container';
import AddMember from './addMember';
import CreateTask from './createTask';
import ProjectTasks from './projectTasks';
import * as actions from '../actions/projectActions';

let styles = {
  grid: {
    width: '99%',
    margin: "2px auto",
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden',
    verticalAlign: 'text-top'
  },
  grid1: {
    display: 'inline-block',
    width: (0.17)*window.innerWidth,
    whiteSpace: 'normal',
    transition: '0.3s',
    margin: '5%',
    verticalAlign: 'text-top'
  },
  card: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: '0.3s',
    textAlign: 'center'
  },
  line: {
    borderStyle: 'dotted',
    height: window.innerHeight,
    width: '1px'
  }
}

class projectDetails extends Component {
  constructor(props) {
   super(props);
   this.state={
     membersTask: []
   }
  }
  componentDidMount = () => {
    this.setState({
      membersTask: this.props.location.state.members_task
    })
    console.log(this.props.location.state.members_task);
    console.log(this.props.projects);
  }

  createTask = (e) => {
    e.preventDefault();
    this.props.actions.createTask();
  }

  render() {
    const style = {
      display: "flex",
      justifyContent: "space-around",
      paddingTop: "1%",
      width: (0.17)*window.innerWidth,
    }

    const styleGrid = {
      margin: '4%',
      padding: '10%',
      textAlign: 'center',

    };

    const styleCard = {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: '0.3s',
      margin: '4%',
      padding: '10%',
      width:  (0.3)*window.innerWith,
      height:  (0.1)*window.innerHeight,
      textAlign: 'center',
    	backgroundColor: 'white',
    	cursor: 'move'
    };

    // const { projects } = this.props.projects;
    // function searchByTitle(projects, project_title){
    // for (let i=0; i < projects.length; i++) {
    //     if (projects[i].project_title === project_title) {
    //         return i;
    //     }
    //   }
    //   return null;
    // }
    // let ObjectIndex1 = searchByTitle(projects, this.props.location.state.project_title);

    // let members_data = projects[ObjectIndex1].membersTask;
    let members_data = this.state.membersTask;

    return (
      <div style={styles.grid}>
        <ProjectTasks membersData={members_data} projectTitle={this.props.location.state.project_title}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log("aa"+state.projects);
    return {
      projects: state.projects
    }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}


connect(mapStateToProps, mapDispatchToProps)(projectDetails);
export default DragDropContext(HTML5Backend)(projectDetails);
