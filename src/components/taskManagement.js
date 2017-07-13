import React, { Component } from 'react';
// import {Link, browserHistory} from 'react-router';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Navbar, Grid, Row, Col, Glyphicon, Modal, form, FormGroup, FormControl, ControlLabel, option } from 'react-bootstrap';

import * as actions from '../actions/projectActions';

let styles = {
  card: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: '0.3s',
    margin: '3%',
    padding: '1%',
    paddingLeft: '2%',
  },
  container: {
    padding: "2px 16px"
  },
  addProjectCard: {
    boxShadow: "0 4px 8px 2px rgba(0,0,0,0.2)",
    transition: '0.3s',
    margin: '3%',
    padding: '3%',
    textAlign: 'center',
    paddingTop: '4%',
    paddingBottom: '4%'
  }
}

class TaskManagement extends Component {
  constructor(props) {
   super(props);
   this.state={
     showCreateProjectModal: false,
     projectTitle: null,
     projectDescription: null,
     members: 1
   }
  }

  closeCreateProjectModal = () => {
    this.setState({ showCreateProjectModal: false });
  }

  openCreateProjectModal = () => {
    this.setState({ showCreateProjectModal: true });
  }

  changeTaskTitle = (e) => {
    this.setState({ projectTitle: e.target.value });
  }

  changeTaskDescription = (e) => {
    this.setState({ projectDescription: e.target.value });
  }

  changeMembersOption = (e) => {
    this.setState({
      members: e.target.value
    });
  }

  createProject = (e) => {
    e.preventDefault();
    // this.props.actions.loadProjects();
    this.props.actions.createProject(this.state.projectTitle, this.state.projectDescription, this.state.members);
    this.setState({ showCreateProjectModal: false });
  }

  goToProjectDetails = (e, title, members_task, projects) => {
    // e.preventDefault();
    console.log("Title"+title);
    this.props.history.push({
    pathname: `projectDetails/${title}`,
    search: '',
    state: { members_task: members_task, project_title: title, total_projects: projects}
    });
  }

  render() {
    const { projects } = this.props.projects;
    return (
      <div>
      <div style={{backgroundColor:'#00b386', borderColor: '#030033'}}>
      <Navbar bsStyle={{backgroundColor:'#00b386'}} fixedTop={true} style={{backgroundColor:'#00b386', padding:'1%'}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#" bsStyle={{color:'white'}} style={{color:'white', fontSize:"25"}}>Task Management</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      </div>

      <Grid style={{marginTop:'6%'}}>
      <Row className="show-grid">
        {
          projects ? (
    projects.map((project, i) => {
      return <Col key={i} xs={11} md={3} sm={5} style={styles.card} onClick={() => this.goToProjectDetails(this,project.project_title, project.members_task, projects)}>
      <h3>{project.project_title}</h3>
      <p>{project.project_description}</p>
      <h5>Total Members : {project.members}</h5>
      </Col>
    })
      ) : null
        }
        <Col xs={11} md={3} sm={5} style={styles.addProjectCard} onClick={this.openCreateProjectModal}>
          <Glyphicon glyph="plus-sign" />
          <h5>Create New Project</h5>
        </Col>
        </Row>
        </Grid>

        <Modal backdrop={false} show={this.state.showCreateProjectModal} onHide={this.closeCreateProjectModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Title"
              onChange={this.changeTaskTitle}
            />
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Start typing..." onChange={this.changeTaskDescription} />
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Members</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.changeMembersOption} >
            {[...Array(20)].map((x, i) =>
               <option value={i} key={i} >{i}</option>
             )}
            </FormControl>
          </FormGroup>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeCreateProjectModal}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.createProject}>Create</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {
      projects: state.projects
    }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskManagement);
