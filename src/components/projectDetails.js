import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/projectActions';
import { Button, Navbar, Grid, Row, Col, Glyphicon, Modal, form, FormGroup, FormControl, ControlLabel, option } from 'react-bootstrap';

let styles = {
  grid: {
     display: 'block',
    overflow: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap'
  },
  card: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: '0.3s',
    margin: '4%',
    padding: '8%',
    textAlign: 'center'
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
  }

  componentDidMount = () => {
    console.log(this.props.location.state.title);
  }

  render() {
    const { projects, isFetching } = this.props.projects;
    return (
      <div style={styles.grid}>
      <Grid fluid={true}>
      <Row>
      {[...Array(5)].map((x, i) =>
        <Col key={i} xs={10} sm={3} md={2.5} lg={3} >
        <Row>
        <Col xs={2} sm={1} md={1} lg={1}>
        <div style={styles.line} className="verticalLine"></div>
        </Col>
        <Col xs={10} sm={10} md={10} lg={10}>
          <p style={styles.card}>Add New Member</p>
            </Col>
            </Row>
            </Col>
       )}
       </Row>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
