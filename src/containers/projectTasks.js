import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Nav, Glyphicon} from 'react-bootstrap';

import NavBar from '../components/navbar/navbar';
import CreateProject from '../components/project/createProject';


import * as actions from '../actions/projectActions';


export class ProjectTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members_data: this.props.membersData
    };
  }

  componentWillReceiveProps(nextProps){
    let {projects} = nextProps.projects;
    function searchByTitle(projects, project_title){
    for (let i=0; i < projects.length; i++) {
        if (projects[i].project_title === project_title) {
            return projects[i];
        }
      }
      return null;
    }
    let UpdatedProjects = searchByTitle(projects, nextProps.projectTitle);
    this.setState({
      members_data : UpdatedProjects.members_task
    });
  }


  render() {
    const {members_data}= this.state;
    const style = {
      color:'white',
      backgroundColor:'#00b386',
      fontSize:"25"
    };
    return (
      <div>
        <NavBar>
        <Nav pullRight>
        <div>
        <a href="/#/project"><Glyphicon bsSize="large" style={style} glyph="remove" /></a>
        </div>
        </Nav>
        </NavBar>

        <CreateProject
        members_data = {members_data}
        projectTitle= {this.props.projectTitle}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      projects: state.projects
    }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectTasks);
