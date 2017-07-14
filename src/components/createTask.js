import React, { Component } from 'react';
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
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#f2f2f2',
    opacity: 0.5
  },
  styleGrid: {
    margin: '4%',
    padding: '10%',
    textAlign: 'center',
  },
  button: {
    borderRadius: '25px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '-5px',
    paddingBottom: '-5px'
  },
  createButton: {
    marginLeft: '10px',
    backgroundColor:'#00b386',
    color:'white'
  },
  cancelButton: {
    backgroundColor:'white',
    color:'grey',
    borderColor: 'grey'
  }
}

const StatusData = ["Done", "On Hold", "In Process", "Sent", "Schedule"];

export class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state={
      showCreateTaskModal: false,
      taskTitle: null,
      taskDescription: null,
      taskStatus: "Done",
      taskTitleStatus: null,
      taskDescriptionStatus: null
    }
    this.openCreateTaskModal = this.openCreateTaskModal.bind(this);
    this.idGenerator = this.idGenerator.bind(this);
  }

  // componentDidMount(){
  //   console.log(this.props.projects);
  // }

  closeCreateTaskModal(){
    this.setState({ showCreateTaskModal: false, taskTitle:null, taskDescription:null, taskTitleStatus: null,  taskDescriptionStatus: null });
  }

  openCreateTaskModal(){
    this.setState({ showCreateTaskModal: true });
  }

  changeTaskTitle(e){
    let length = e.target.value.length;
    let Status = 'success';
    if (length <= 0){
      Status = 'error'
    }
    this.setState({ taskTitle: e.target.value, taskTitleStatus:Status});
  }

  changeTaskDescription(e){
    let length = e.target.value.length;
    let Status = 'success';
    if (length <= 0){
      Status = 'error'
    }
    this.setState({ taskDescription: e.target.value, taskDescriptionStatus:Status});
  }

  changeTaskStatus(e){
    this.setState({
      taskStatus: e.target.value
    });
  }

  idGenerator(n){
    let generatorId="";
    var stringg="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for(let i=0;i<n;i++){
      generatorId += stringg.charAt(Math.floor(Math.random()*stringg.length));
    }
    return generatorId;
  }

  createTasks(){
    // e.preventDefault();

    if(this.state.taskTitleStatus == null){
      this.setState({taskTitleStatus: 'error'});
    }

    if(this.state.taskDescriptionStatus == null){
      this.setState({taskDescriptionStatus: 'error'});
    }
    else if(this.state.taskTitleStatus == 'success' && this.state.taskTitleStatus == 'success' ){
    let task_id = this.idGenerator(5) + this.state.taskTitle + this.idGenerator(5);
    this.props.actions.createTask(this.state.taskTitle, this.state.taskDescription, this.state.taskStatus, this.props.memberName, this.props.projectTitle, task_id);
    this.setState({ showCreateTaskModal: false, taskTitle:null, taskDescription:null, taskTitleStatus: null,  taskDescriptionStatus: null});
  }
  }

  render() {
    return (
      <div>
      <div style={styles.card} onClick={() => this.openCreateTaskModal()}>
      <h5 id="createTask" style={styles.styleGrid}><Glyphicon glyph="plus-sign" /><br />
      Create Task</h5>
      </div>

              <Modal backdrop={false} show={this.state.showCreateTaskModal} onHide={() => this.closeCreateTaskModal()}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.state.taskTitleStatus}
                >
                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.taskTitle}
                    placeholder="Enter Title"
                    onChange={(e)=>this.changeTaskTitle(e)}
                  />
                </FormGroup>
                <FormGroup controlId="formControlsTextarea" validationState={this.state.taskDescriptionStatus}>
                  <ControlLabel>Description</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Start typing..." onChange={(e)=>this.changeTaskDescription(e)} />
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Status</ControlLabel>
                  <FormControl componentClass="select" placeholder="select" onChange={(e)=>this.changeTaskStatus(e)} >
                  {StatusData.map((x, i) =>
                     <option value={x} key={i} >{x}</option>
                   )}
                  </FormControl>
                </FormGroup>
                </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button id='cancel' bsStyle="white" style={Object.assign({}, styles.button, styles.cancelButton)} onClick={()=>this.closeCreateTaskModal()}>Cancel</Button>
                  <Button id='submit' bsStyle="Green" style={Object.assign({}, styles.button, styles.createButton)} onClick={() => this.createTasks()}>Create</Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
