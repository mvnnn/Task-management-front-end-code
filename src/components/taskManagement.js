import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Navbar, Grid, Row, Col, Glyphicon, Modal, form, FormGroup, FormControl, ControlLabel, option } from 'react-bootstrap';

import * as actions from '../actions/projectActions';

var styles = {
  card: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: '0.3s',
    margin: '4%'
  },
  container: {
    padding: "2px 16px"
  }
}

class TaskManagement extends Component {
  constructor(props) {
   super(props);
   this.state={
     showCreateProjectModal: false,
     taskTitle: null,
     taskDescription: null,
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
    this.setState({ taskTitle: e.target.value });
  }

  changeTaskDescription = (e) => {
    this.setState({ taskDescription: e.target.value });
  }

  changeMembersOption = (e) => {
    this.setState({
      members: e.target.value
    });
  }

  createProject = (e) => {
    e.preventDefault();
    // this.props.actions.loadProjects();
    this.props.actions.createProject(this.state.taskTitle, this.state.taskDescription, this.state.members);
    this.setState({ showCreateProjectModal: false });
  }

  render() {
    const { projects } = this.props.projects;
    return (
      <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Task Management</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>

      <Grid>
      <Row className="show-grid">
        {
          projects ? (
    projects.map((project, i) => {
      return <Col key={i} xs={11} md={3} sm={5} style={styles.card}>
      <h3>{project.task_title}</h3>
      <p>{project.task_description}</p>
      <h5>Total Members : {project.members}</h5>
      </Col>
    })
      ) : null
        }
        <Col xs={11} md={3} sm={5} style={styles.card} onClick={this.openCreateProjectModal}>
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
            <ControlLabel>Working example with validation</ControlLabel>
            <FormControl
              type="text"
              value={this.state.taskTitle}
              placeholder="Enter Title"
              onChange={this.changeTaskTitle}
            />
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Textarea</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Start typing..." onChange={this.changeTaskDescription} />
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select</ControlLabel>
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
