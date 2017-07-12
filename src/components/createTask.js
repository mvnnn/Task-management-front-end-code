import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Navbar, Grid, Row, Col, Glyphicon, Modal, form, FormGroup, FormControl, ControlLabel, option } from 'react-bootstrap';

import * as actions from '../actions/projectActions';

let styles = {
  grid: {
    width: '99%',
    margin: "2px auto",
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  grid1: {
    display: 'inline-block',
    width: (0.17)*window.innerWidth,
    whiteSpace: 'normal',
    transition: '0.3s',
    margin: '5%',
    height: (0.1)*window.innerHeight,
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

const StatusData = ["Done", "On Hold", "In Process", "Sent", "Schedule"];

class createTask extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showCreateTaskModal: false,
      taskTitle: null,
      taskDescription: null,
      taskStatus: "Done"
    }
    this.openCreateTaskModal = this.openCreateTaskModal.bind(this);
    this.idGenerator = this.idGenerator.bind(this);
  }

  componentDidMount = () => {
    console.log(this.props.projects);
  }

  closeCreateTaskModal = () => {
    this.setState({ showCreateTaskModal: false });
  }

  openCreateTaskModal = () => {
    this.setState({ showCreateTaskModal: true });
  }

  changeTaskTitle = (e) => {
    this.setState({ taskTitle: e.target.value });
  }

  changeTaskDescription = (e) => {
    this.setState({ taskDescription: e.target.value });
  }

  changeTaskStatus = (e) => {

    this.setState({
      taskStatus: e.target.value
    });
  }

  idGenerator = (n) => {
    let generatorId="";
    var stringg="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for(let i=0;i<n;i++){
      generatorId += stringg.charAt(Math.floor(Math.random()*stringg.length));
    }
    return generatorId;
  };

  createTask = (e) => {
    e.preventDefault();
    let task_id = this.idGenerator(5) + this.state.taskTitle + this.idGenerator(5);
    this.props.actions.createTask(this.state.taskTitle, this.state.taskDescription, this.state.taskStatus, this.props.memberName, this.props.projectTitle, task_id);
    this.setState({ showCreateTaskModal: false });
  }

  render() {
    const styleGrid = {
      margin: '4%',
      padding: '10%',
      textAlign: 'center',

    };
    return (
      <div>
      <div style={styles.card} onClick={this.openCreateTaskModal}>
      <h5 style={styleGrid}>Create Task</h5>
      </div>

              <Modal backdrop={false} show={this.state.showCreateTaskModal} onHide={this.closeCreateTaskModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                <FormGroup
                  controlId="formBasicText"
                >
                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.taskTitle}
                    placeholder="Enter Title"
                    onChange={this.changeTaskTitle}
                  />
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Start typing..." onChange={this.changeTaskDescription} />
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Status</ControlLabel>
                  <FormControl componentClass="select" placeholder="select" onChange={this.changeTaskStatus} >
                  {StatusData.map((x, i) =>
                     <option value={x} key={i} >{x}</option>
                   )}
                  </FormControl>
                </FormGroup>
                </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.closeCreateTaskModal}>Cancel</Button>
                  <Button bsStyle="primary" onClick={this.createTask}>Create</Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(createTask);
