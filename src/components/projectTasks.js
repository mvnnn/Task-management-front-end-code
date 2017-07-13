import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Navbar, Nav, Grid, Row, Col, Glyphicon, NavItem} from 'react-bootstrap';

import Container from './Container';
import AddMember from './addMember';
import CreateTask from './createTask';
import * as actions from '../actions/projectActions';

let styles = {
  Taskgrid: {
    display: 'inline-block',
    whiteSpace: 'normal',
    transition: '0.3s',
    margin : '3%',
    padding : '1%',
    paddingTop: '0',
    marginTop : '0',
    marginRight : '-3%',
    verticalAlign: 'text-top',
    borderLeft: '1px dashed grey',
    height: window.innerHeight,
    overflowY: 'auto',
    overflowX: 'auto',
  },
  AddMembergrid: {
    display: 'inline-block',
    whiteSpace: 'normal',
    transition: '0.3s',
    margin : '3%',
    padding : '1%',
    paddingTop: '0',
    marginTop : '0',
    width : (0.17)*window.innerWidth,
    verticalAlign: 'text-top',
    borderLeft: '1px dashed grey',
    height: window.innerHeight,
    overflowY: 'auto',
    overflowX: 'auto',
  },
  card: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: '0.3s',
    textAlign: 'center',
    width: '100%'
  },
  line: {
    borderLeft: '6px solid red'
  }
}

class projectTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members_data: this.props.membersData
    };
  }

  componentWillReceiveProps = (nextProps) => {
    let {projects} = nextProps.projects;
    // console.log("update====>"+projects+".."+nextProps.projectTitle);
    function searchByTitle(projects, project_title){
    for (let i=0; i < projects.length; i++) {
        if (projects[i].project_title === project_title) {
            return projects[i];
        }
      }
      return null;
    }
    let ObjectIndex1 = searchByTitle(projects, nextProps.projectTitle);

    // console.log("Update"+JSON.stringify(ObjectIndex1.members_task));
    // let JSONObject = JSON.stringify(ObjectIndex1);
    // let data = (this.props.projects)[ObjectIndex1].members_task;
    // console.log("INDEX"+ projects[ObjectIndex1].members_task);
    // this.forceUpdate(ObjectIndex1.members_task);
    this.setState({
      members_data : ObjectIndex1.members_task
    });
  }


  render() {
    const style = {
      display: "flex",
      justifyContent: "space-around",
      paddingTop: "1%",
      width: (0.17)*window.innerWidth,
    }

    const styleGrid = {
      margin: '5%',
      padding: '9%',
      textAlign: 'center',
    };

    const styleCard = {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: '0.3s',
      margin: '4%',
      padding: '10%',
      // width:  (0.3)*window.innerWith,
      // height:  (0.1)*window.innerHeight,
      textAlign: 'center',
      backgroundColor: 'white',
      cursor: 'move'
    };

    // let {projects} = this.props.projects;

    let members_data = this.state.members_data;

    return (
      <div>
        <Navbar bsStyle={{backgroundColor:'#00b386'}} fixedTop={true} style={{backgroundColor:'#00b386', padding:'1%'}}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#" bsStyle={{color:'white'}} style={{color:'white', fontSize:"25"}}>Task Management</a>
            </Navbar.Brand>
          </Navbar.Header>
        <Nav style={{paddingTop: '1%'}} pullRight >
        <div>
        <a href="/#/project"><Glyphicon bsSize="large" style={{color:'white', backgroundColor:'#00b386', fontSize:"25"}} glyph="remove" /></a>
        </div>
    </Nav>
        </Navbar>
        <div style={{marginTop:'8%'}}>
      {
        this.state.members_data ? (
  this.state.members_data.map((data, i) => {
    return <div key={i} style={styles.Taskgrid}>
      <div style={styles.card}>
      <h5 style={styleGrid}>{data.member_name}</h5>
      </div>
    <Container id={i} CNumber={i} list={data.tasks} memberName={data.member_name} projectTitle={this.props.projectTitle} />
    <CreateTask {...this.props} memberName={data.member_name} projectTitle={this.props.projectTitle}/>
    </div>
  })
    ) : null
      }
      <div style={styles.AddMembergrid}>
        <AddMember {...this.props} projectTitle={this.props.projectTitle} />
      </div>
      </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(projectTasks);
