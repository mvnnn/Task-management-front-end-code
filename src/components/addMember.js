import React, { Component } from 'react';
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

class addMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateMemberModal: false,
      memberName: null
    };
  }

  closeCreateMemberModal = () => {
    this.setState({ showCreateMemberModal: false });
  }

  openCreateMemberModal = () => {
    this.setState({ showCreateMemberModal: true });
  }

  changeMemberName = (e) => {
    this.setState({ memberName: e.target.value });
  }

  addMember = (e) => {
    e.preventDefault();
    this.props.actions.addMember(this.state.memberName, this.props.projectTitle);
    this.setState({ showCreateMemberModal: false });
  }

  render() {
    const styleGrid = {
      margin: '4%',
      padding: '10%',
      textAlign: 'center'
    };
    return (<div>
      <div style={styles.card} onClick={this.openCreateMemberModal}>
      <h5 style={styleGrid}>Add New Member</h5>
      </div>
        <Modal backdrop={false} show={this.state.showCreateMemberModal} onHide={this.closeCreateMemberModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Member Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Member Name"
              onChange={this.changeMemberName}
            />
          </FormGroup>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeCreateMemberModal}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.addMember}>Create</Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(addMember);
