import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/projectActions';
import { Button, Navbar, Grid, Row, Col, Glyphicon, Modal, form, FormGroup, FormControl, ControlLabel, option } from 'react-bootstrap';

let styles = {
  grid: {
    position: 'relative',
    height: window.innerHeight,
    width: '99%',
    margin: "2px auto",
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden',
    verticalAlign:'middle',
  },
  grid1: {
    display: 'inline-block',
    width: (0.15)*window.innerWidth,
    margin: '0.5em',
    padding: '3px',
    whiteSpace: 'normal',
    textAlign: 'center',
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: '0.3s',
    margin: '4%',
    height: (0.1)*window.innerHeight,
    textAlign: 'center',
  },
  card: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: '0.3s',
    margin: '4%',
    width:  (0.2)*window.innerWith,
    height:  (0.1)*window.innerHeight,
    textAlign: 'center',
  },
  line: {
    borderStyle: 'dotted',
    height: window.innerHeight,
    width: '1px'
  }
}


class ProjectDetails extends Component {
  constructor(props) {
   super(props);
   this.state={
     data: colors
   }
  }
  componentDidMount = () => {
    console.log(this.props.location.state.title);
  }

  render() {
  		return  <Board data={data} customCardLayout>
      <CustomCard />
      </Board>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
