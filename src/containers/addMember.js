import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions/projectActions';
import AddMemberComponent from '../components/task/member/addMember';

export class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateMemberModal: false,
      memberName: null,
      memberNameStatus: null
    };
    this.addMembers = this.addMembers.bind(this);
    this.openCreateMemberModal = this.openCreateMemberModal.bind(this);
    this.closeCreateMemberModal = this.closeCreateMemberModal.bind(this);
    this.changeMemberName = this.changeMemberName.bind(this);
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

    if(this.state.memberNameStatus == null){
      this.setState({memberNameStatus: 'error'});
    }
    else if(this.state.memberNameStatus === 'success'){
    this.props.actions.addMember(this.state.memberName, this.props.projectTitle);
    this.setState({ showCreateMemberModal: false, memberName: null, memberNameStatus: null});
    }
  }

  render() {
    const {
      showCreateMemberModal,
      memberName,
      memberNameStatus
    } = this.state;
    return (<div>
      <AddMemberComponent
      showCreateMemberModal = {showCreateMemberModal}
      memberNameStatus = {memberNameStatus}
      memberName = {memberName}
      openCreateMemberModal = {this.openCreateMemberModal}
      closeCreateMemberModal = {this.closeCreateMemberModal}
      changeMemberName = {this.changeMemberName}
      addMembers = {this.addMembers}
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


export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
