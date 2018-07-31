import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import NavBar from '../components/navbar/navbar';
import ProjectModal from '../components/project/projectModal';
import ProjectGrid from '../components/project/projectGrid';
import * as actions from '../actions/projectActions';

export class ProjectManagement extends Component {
  constructor(props) {
   super(props);
   this.state={
     showCreateProjectModal: false,
     projectTitle: '',
     projectDescription: '',
     projectTitleStatus: null,
     projectDescriptionStatus: null,
     members: 1
   }
   this.closeCreateProjectModal = this.closeCreateProjectModal.bind(this);
   this.createProjects = this.createProjects.bind(this);
   this.changeMembersOption = this.changeMembersOption.bind(this);
   this.changeProjectDescription = this.changeProjectDescription.bind(this);
   this.changeProjectTitle = this.changeProjectTitle.bind(this);
   this.openCreateProjectModal = this.openCreateProjectModal.bind(this);
   this.goToProjectDetails = this.goToProjectDetails.bind(this);
  }

  closeCreateProjectModal(){
    this.setState({ showCreateProjectModal: false, projectTitle:null, projectDescription:null,projectTitleStatus: null, projectDescriptionStatus:null });
  }

  openCreateProjectModal(){
    this.setState({ showCreateProjectModal: true });
  }

  changeProjectTitle(e){
    let length = e.target.value.length;
    let Status = 'success';
    if (length <= 0){
      Status = 'error'
    }
        this.setState({ projectTitle: e.target.value, projectTitleStatus:Status});
      }

  changeProjectDescription(e){
    let length = e.target.value.length;
    let Status = 'success';
    if (length <= 0){
      Status = 'error'
    }
    this.setState({ projectDescription: e.target.value, projectDescriptionStatus:Status});
  }

  changeMembersOption(e){
    this.setState({
      members: e.target.value
    });
  }

  createProjects(e){
    if(this.state.projectTitleStatus == null){
      this.setState({projectTitleStatus: 'error'});
    }

    if(this.state.projectDescriptionStatus == null){
      this.setState({projectDescriptionStatus: 'error'});
    }
    else if(this.state.projectTitleStatus === 'success' && this.state.projectDescriptionStatus === 'success' ){
    this.props.actions.createProject(this.state.projectTitle, this.state.projectDescription, this.state.members);
    this.setState({ showCreateProjectModal: false, projectTitle:null, projectDescription:null, projectTitleStatus: null, projectDescriptionStatus:null });
    }
  }

  goToProjectDetails(e, title, members_task, projects){
    e.preventDefault();
    this.props.history.push({
    pathname: `projectDetails/${title}`,
    search: '',
    state: { members_task: members_task, project_title: title, total_projects: projects}
    });
  }

  render() {
    const { projects } = this.props.projects;

    const {
      showCreateProjectModal,
      projectTitle,
      projectTitleStatus,
      projectDescriptionStatus
    } = this.state;

    return (
      <div>
      <NavBar />

      <ProjectGrid
      goToProjectDetails= {this.goToProjectDetails}
      openCreateProjectModal= {this.openCreateProjectModal}
      projects = {projects}
      />

        <ProjectModal
          projectTitle={projectTitle}
          projectDescriptionStatus={projectDescriptionStatus}
          showCreateProjectModal={showCreateProjectModal}
          projectTitleStatus={projectTitleStatus}
          closeCreateProjectModal = {this.closeCreateProjectModal}
          createProjects = {this.createProjects}
          changeMembersOption = {this.changeMembersOption}
          changeProjectDescription = {this.changeProjectDescription}
          changeProjectTitle = {this.changeProjectTitle}
        />
  
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagement);
