import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/taskActions';

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
    this.state = {message: 'Hello!'};
    // This line is important!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.props.actions.createMember();
  }

  render() {
    const styleGrid = {
      margin: '4%',
      padding: '10%',
      textAlign: 'center'
    };
    return (
      <div style={styles.card} onClick={this.handleClick}>
      <h5 style={styleGrid}>Add New Member</h5>
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
