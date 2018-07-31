import React from "react";
import PropTypes from "prop-types";
import Cssmodules from "react-css-modules";

import styles from "./addMember.scss";
import { Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

const AddMemberComponent = ({
    showCreateMemberModal,
    memberNameStatus,
    memberName,
    openCreateMemberModal,
    closeCreateMemberModal,
    changeMemberName,
    addMembers
}) => {
	return (
	<div className="add-member-component">
              <div className="card" onClick={()=>openCreateMemberModal()}>
      <h5 id="addNewMember" className="style-grid">Add New Member</h5>
      </div>
        <Modal backdrop={false} show={showCreateMemberModal} onHide={()=>closeCreateMemberModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Add Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
          <FormGroup
            controlId="formBasicText"
            validationState={memberNameStatus}
          >
            <ControlLabel>Member Name</ControlLabel>
            <FormControl
              type="text"
              value={memberName}
              placeholder="Enter Member Name"
              onChange={(e) => changeMemberName(e)}
            />
          </FormGroup>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button id="cancel" bsStyle="white" className="button cancel-button" onClick={() => closeCreateMemberModal()}>Cancel</Button>
            <Button id="submit" bsStyle="Green" className="button create-button" onClick={() => addMembers()}>Create</Button>
          </Modal.Footer>
        </Modal>
	</div>
	);
};

AddMemberComponent.displayName = "AddMemberComponent";
AddMemberComponent.propTypes = {
  showCreateMemberModal: PropTypes.bool,
  memberNameStatus: PropTypes.string,
  memberName: PropTypes.string,
  openCreateMemberModal: PropTypes.func,
  closeCreateMemberModal: PropTypes.func,
  changeMemberName: PropTypes.func,
  addMembers: PropTypes.func
};
AddMemberComponent.defaultProps = {};

export default Cssmodules(AddMemberComponent, styles);