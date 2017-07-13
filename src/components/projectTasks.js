import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Container from './Container';
import AddMember from './addMember';
import CreateTask from './createTask';
import * as actions from '../actions/taskActions';

let styles = {
  grid: {
    width: '99%',
    margin: "2px auto",
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden',
    verticalAlign: 'text-top'
  },
  grid1: {
    display: 'inline-block',
    width: (0.17)*window.innerWidth,
    whiteSpace: 'normal',
    transition: '0.3s',
    margin: '5%',
    verticalAlign: 'text-top'
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

class projectTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members_data: this.props.membersData
    };
  }

  // componentDidMount = () => {
  //   let {projects} = this.props.projects;
  //   console.log(projects+".."+this.props.projectTitle);
  //   function searchByTitle(projects, project_title){
  //   for (let i=0; i < projects.length; i++) {
  //       if (projects[i].project_title === project_title) {
  //           return projects[i];
  //       }
  //     }
  //     return null;
  //   }
  //   let ObjectIndex1 = searchByTitle(projects, this.props.projectTitle);
  //
  //   console.log(typeof ObjectIndex1.members_task);
  //   let JSONObject = JSON.stringify(ObjectIndex1);
  //   // let data = (this.props.projects)[ObjectIndex1].members_task;
  //   // console.log("INDEX"+ projects[ObjectIndex1].members_task);
  //   this.setState({
  //     members_data : ObjectIndex1.members_task
  //   })
  // }

  componentWillReceiveProps = (nextProps) => {
    let {projects} = nextProps.projects;
    console.log("update====>"+projects+".."+nextProps.projectTitle);
    function searchByTitle(projects, project_title){
    for (let i=0; i < projects.length; i++) {
        if (projects[i].project_title === project_title) {
            return projects[i];
        }
      }
      return null;
    }
    let ObjectIndex1 = searchByTitle(projects, nextProps.projectTitle);

    console.log("Update"+JSON.stringify(ObjectIndex1.members_task));
    let JSONObject = JSON.stringify(ObjectIndex1);
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
      margin: '4%',
      padding: '10%',
      textAlign: 'center',

    };

    const styleCard = {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: '0.3s',
      margin: '4%',
      padding: '10%',
      width:  (0.3)*window.innerWith,
      height:  (0.1)*window.innerHeight,
      textAlign: 'center',
      backgroundColor: 'white',
      cursor: 'move'
    };

    // let {projects} = this.props.projects;

    let members_data = this.state.members_data;

    return (
      <div>
      {
        this.state.members_data ? (
  this.state.members_data.map((data, i) => {
    return <div key={i} style={styles.grid1}>
      <div style={styles.card}>
      <h5 style={styleGrid}>{data.member_name}</h5>
      </div>
    <Container id={i} CNumber={i} list={data.tasks} memberName={data.member_name} projectTitle={this.props.projectTitle} />
    <CreateTask {...this.props} memberName={data.member_name} projectTitle={this.props.projectTitle}/>
    </div>
  })
    ) : null
      }
      <div style={styles.grid1}>
        <AddMember {...this.props} projectTitle={this.props.projectTitle} />
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
