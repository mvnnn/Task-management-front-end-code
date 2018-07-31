import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions/projectActions';
import CreateTasksComponent from '../components/task/createTask';

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
    this.changeTaskTitle = this.changeTaskTitle.bind(this);
    this.closeCreateTaskModal = this.closeCreateTaskModal.bind(this);
    this.changeTaskDescription = this.changeTaskDescription.bind(this);
    this.createTasks = this.createTasks.bind(this);
    this.changeTaskStatus = this.changeTaskStatus.bind(this);
  }

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

    if(this.state.taskTitleStatus == null){
      this.setState({taskTitleStatus: 'error'});
    }

    if(this.state.taskDescriptionStatus == null){
      this.setState({taskDescriptionStatus: 'error'});
    }
    else if(this.state.taskTitleStatus === 'success' && this.state.taskTitleStatus === 'success' ){
    let task_id = this.idGenerator(5) + this.state.taskTitle + this.idGenerator(5);
    this.props.actions.createTask(this.state.taskTitle, this.state.taskDescription, this.state.taskStatus, this.props.memberName, this.props.projectTitle, task_id);
    this.setState({ showCreateTaskModal: false, taskTitle:null, taskDescription:null, taskTitleStatus: null,  taskDescriptionStatus: null});
  }
  }

  render() {
    const {
      showCreateTaskModal,
      taskTitle,
      taskTitleStatus,
      taskDescriptionStatus
    } = this.state;
    return (
      <div>
      <CreateTasksComponent
      showCreateTaskModal = {showCreateTaskModal}
      taskTitle = {taskTitle}
      taskDescriptionStatus = {taskDescriptionStatus}
      taskTitleStatus = {taskTitleStatus}
      changeTaskTitle = {this.changeTaskTitle}
      closeCreateTaskModal = {this.closeCreateTaskModal}
      openCreateTaskModal = {this.openCreateTaskModal}
      changeTaskDescription = {this.changeTaskDescription}
      createTasks = {this.createTasks}
      changeTaskStatus = {this.changeTaskStatus}
        />
        </div>
    );
  }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
