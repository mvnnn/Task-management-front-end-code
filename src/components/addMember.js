import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Navbar, Grid, Row, Col, Glyphicon, Modal, form, FormGroup, FormControl, ControlLabel, option } from 'react-bootstrap';

import * as actions from '../actions/projectActions';

let styles = {
  card: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: '0.3s',
    textAlign: 'center',
    minWidth: '200px'
  },
  styleGrid: {
    margin: '4%',
    padding: '10%',
    textAlign: 'center'
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

export class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateMemberModal: false,
      memberName: null,
      memberNameStatus: null
    };
  }

  closeCreateMemberModal(){
    this.setState({ showCreateMemberModal: false, memberName: null, memberNameStatus: null });
  }

  openCreateMemberModal(){
    this.setState({ showCreateMemberModal: true });
  }

  changeMemberName(e){
    let length = e.target.value.length;
    let Status = 'success';
    if (length <= 0){
      Status = 'error'
    }
    this.setState({ memberName: e.target.value, memberNameStatus: Status});
  }

  addMembers(){
    // e.preventDefault();

    if(this.state.memberNameStatus == null){
      this.setState({memberNameStatus: 'error'});
    }
    else if(this.state.memberNameStatus == 'success'){
    this.props.actions.addMember(this.state.memberName, this.props.projectTitle);
    this.setState({ showCreateMemberModal: false, memberName: null, memberNameStatus: null});
    }
  }

  render() {
    return (<div>
      <div style={styles.card} onClick={()=>this.openCreateMemberModal()}>
      <h5 id="addNewMember" style={styles.styleGrid}>Add New Member</h5>
      </div>
        <Modal backdrop={false} show={this.state.showCreateMemberModal} onHide={()=>this.closeCreateMemberModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Add Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.state.memberNameStatus}
          >
            <ControlLabel>Member Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.memberName}
              placeholder="Enter Member Name"
              onChange={(e) => this.changeMemberName(e)}
            />
          </FormGroup>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button id="cancel" bsStyle="white" style={{...styles.button, ...styles.cancelButton}} onClick={() => this.closeCreateMemberModal()}>Cancel</Button>
            <Button id="submit" bsStyle="Green" style={{...styles.button, ...styles.createButton}} onClick={() => this.addMembers()}>Create</Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
