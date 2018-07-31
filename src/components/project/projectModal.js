import React from "react";
import PropTypes from "prop-types";
import Cssmodules from "react-css-modules";

import styles from "./projectModal.scss";
import { Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const ProjectModal = ({ projectTitle, projectDescriptionStatus, showCreateProjectModal, projectTitleStatus, closeCreateProjectModal, createProjects, changeMembersOption,
    changeProjectDescription, changeProjectTitle}) => {
	return (
	<div className="projectModal-component">
      <Modal className="createProject" backdrop={false} show={showCreateProjectModal} onHide={() => closeCreateProjectModal()}>
<Modal.Header closeButton>
  <Modal.Title>Create Project</Modal.Title>
</Modal.Header>
<Modal.Body>
<form>
<FormGroup
  controlId="formBasicText"
  validationState={projectTitleStatus}
>
  <ControlLabel>Title</ControlLabel>
  <FormControl
    type="text"
    value={projectTitle}
    placeholder="Enter Title"
    onChange={(e) => changeProjectTitle(e)}
  />
</FormGroup>
<FormGroup controlId="formControlsTextarea" validationState={projectDescriptionStatus} >
  <ControlLabel>Description</ControlLabel>
  <FormControl componentClass="textarea" placeholder="Start typing..." onChange={(e) => changeProjectDescription(e)} />
</FormGroup>
<FormGroup controlId="formControlsSelect">
  <ControlLabel>Members</ControlLabel>
  <FormControl componentClass="select" placeholder="select" onChange={(e) => changeMembersOption(e)} >
  {[...Array(20)].map((x, i) =>
     <option value={i} key={i} >{i}</option>
   )}
  </FormControl>
</FormGroup>
</form>
</Modal.Body>
<Modal.Footer>
  <Button className="button cancel-button" id="cancel" bsStyle="white" onClick={() => closeCreateProjectModal()}>Cancel</Button>
  <Button className="button create-button" id="submit" bsStyle="Green" onClick={(e) => createProjects(e)}>Create</Button>
</Modal.Footer>
</Modal>
		</div>
	);
};

ProjectModal.displayName = "ProjectModal";
ProjectModal.propTypes = {
  projectTitle: PropTypes.string,
  projectDescriptionStatus: PropTypes.string,
  showCreateProjectModal: PropTypes.bool,
  projectTitleStatus: PropTypes.string,
  closeCreateProjectModal: PropTypes.func,
  createProjects: PropTypes.func,
  changeMembersOption: PropTypes.func,
  changeProjectDescription: PropTypes.func,
  changeProjectTitle: PropTypes.func
};
ProjectModal.defaultProps = {};

export default Cssmodules(ProjectModal, styles);