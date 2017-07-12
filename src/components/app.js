import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';

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

class App extends Component {
  constructor(props) {
   super(props);
   this.state={
     membersTask: []
   }
  }
  componentDidMount = () => {
    this.setState({
      membersTask: this.props.location.state.members_task
    })
    console.log(this.props.location.state.members_task);
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

    const members_data = this.state.membersTask;

    return (
      <div style={styles.grid}>
        {
          members_data ? (
    members_data.map((data, i) => {
      return <div key={i} style={styles.grid1}>
        <div style={styles.card}>
        <h5 style={styleGrid}>{data.member_name}</h5>
        </div>
      <Container id={i} list={data.tasks} />
        <div style={styles.card}>
        <h5 style={styleGrid}>Create Task</h5>
        </div>
      </div>
    })
      ) : null
        }

        <div style={styles.grid1}>
          <div style={styles.card}>
          <h5 style={styleGrid}>Add New Member</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
