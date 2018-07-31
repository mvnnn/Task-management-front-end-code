import React from "react";
import PropTypes from "prop-types";
import Cssmodules from "react-css-modules";

import styles from "./createTask.scss";
import { Modal, Button, FormGroup, ControlLabel, FormControl, Glyphicon} from 'react-bootstrap';


const StatusData = ["Done", "On Hold", "In Process", "Sent", "Schedule"];

const createTasksComponent = ({ showCreateTaskModal, taskTitle, taskDescriptionStatus,
    taskTitleStatus, changeTaskTitle, closeCreateTaskModal,
    openCreateTaskModal, changeTaskDescription, createTasks, changeTaskStatus}) => {
	return (
	<div className="createTask-component">
              <div className="card" onClick={() => openCreateTaskModal()}>
      <h5 id="createTask" className="style-grid"><Glyphicon glyph="plus-sign" /><br />
      Create Task</h5>
      </div>

              <Modal backdrop={false} show={showCreateTaskModal} onHide={() => closeCreateTaskModal()}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                <FormGroup
                  controlId="formBasicText"
                  validationState={taskTitleStatus}
                >
                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                    type="text"
                    value={taskTitle}
                    placeholder="Enter Title"
                    onChange={(e)=>changeTaskTitle(e)}
                  />
                </FormGroup>
                <FormGroup controlId="formControlsTextarea" validationState={taskDescriptionStatus}>
                  <ControlLabel>Description</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Start typing..." onChange={(e)=>changeTaskDescription(e)} />
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Status</ControlLabel>
                  <FormControl componentClass="select" placeholder="select" onChange={(e)=>changeTaskStatus(e)} >
                  {StatusData.map((x, i) =>
                     <option value={x} key={i} >{x}</option>
                   )}
                  </FormControl>
                </FormGroup>
                </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button id='cancel' bsStyle="white" className="button cancel-button" onClick={()=> closeCreateTaskModal()}>Cancel</Button>
                  <Button id='submit' bsStyle="Green" className="button create-button" onClick={() => createTasks()}>Create</Button>
                </Modal.Footer>
              </Modal>
	</div>
	);
};

createTasksComponent.displayName = "createTasksComponent";
createTasksComponent.propTypes = {
  showCreateTaskModal: PropTypes.bool,
  taskTitle: PropTypes.string,
  taskDescriptionStatus: PropTypes.string,
  taskTitleStatus: PropTypes.string,
  changeTaskTitle: PropTypes.func,
  closeCreateTaskModal: PropTypes.func,
  openCreateTaskModal: PropTypes.func,
  changeTaskDescription: PropTypes.func,
  createTasks: PropTypes.func,
  changeTaskStatus: PropTypes.func
};
createTasksComponent.defaultProps = {};

export default Cssmodules(createTasksComponent, styles);