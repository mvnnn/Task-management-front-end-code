import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/projectActions';

import { Grid, Button, ButtonToolbar, DropdownButton, MenuItem, Row, Col} from 'react-bootstrap';
const style = {
	backgroundColor: 'white',
	cursor: 'move'
};

export class Card extends Component {
  constructor(props) {
   super(props);
  }

  changeStatus(value, oldStatus){
    if(value != oldStatus){
      this.props.actions.updateTaskStatus(this.props.projectTitle,this.props.memberName,this.props.card.id, value);
    }
  }

	render() {
		const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
		// const opacity = isDragging ? 0 : 1;

    let Color = "#00b386";

    if(card.status === "Done"){
      Color = "#00b386";
    }
    else if(card.status === "On Hold"){
      Color = "#ff9900";
    }
    else if(card.status === "In Process"){
      Color = "#00cc00";
    }
    else if(card.status === "Sent"){
      Color = "#9900ff";
    }
    else if(card.status === "Schedule"){
      Color = "#ff0066";
    }

    const cardStyle = {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: '0.3s',
      textAlign: 'center',
      width: '100%',
      backgroundColor: '#f2f2f2',
      borderLeft : `2px solid ${Color}`
    };

    const statusButton = {
      backgroundColor: `${Color}`,
      color: 'white',
      borderRadius: '30px',
      fontSize: '80%'
    };

    const buttonBackground = {
      position: 'relative',
      marginTop: '6px'
    };

    const styleGrid = {
      margin: '5%',
      padding: '5%',
      textAlign: 'left',
    };

		return connectDragSource(connectDropTarget(
      <div style={cardStyle}>
      <div style={styleGrid}>
        <div style={{display: 'flex'}}>
        <div>
        <h6 style={{color:'black', fontSize:'bold'}}>{card.task_title} </h6>
        </div>
        <div style={{paddingLeft:'10px'}}>
        <ButtonToolbar style={buttonBackground}>
          <DropdownButton style={statusButton} bsStyle={statusButton} bsSize="xsmall" title={card.status} id="dropdown-size-extra-small" >
            <MenuItem eventKey="1" onSelect={() => this.changeStatus("Done", card.status)}>Done</MenuItem>
            <MenuItem eventKey="2" onSelect={() => this.changeStatus("On Hold", card.status)}>On Hold</MenuItem>
            <MenuItem eventKey="3" onSelect={() => this.changeStatus("In Process", card.status)}>In Process</MenuItem>
            <MenuItem eventKey="4" onSelect={() => this.changeStatus("Sent", card.status)}>Sent</MenuItem>
            <MenuItem eventKey="5" onSelect={() => this.changeStatus("Schedule", card.status)}>Schedule</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
        </div>
      </div>

        <div style={{fontSize:'10'}}>{card.task_description}</div></div>
      </div>
		));
	}
}

const cardSource = {

	beginDrag(props) {
		return {
			index: props.index,
			listId: props.listId,
			card: props.card
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();

		if ( dropResult && dropResult.listId !== item.listId ) {
      props.actions.dragAndDropCardUpdate(props.listId, dropResult.listId, props.card.id, props.projectTitle);
			props.removeCard(item.index);
		}
	}
};

const cardTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		if ( props.listId === sourceListId ) {
			props.moveCard(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}
	}
};

function mapStateToProps(state, ownProps) {
    return {
      projects: state.projects
    }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default flow(
	DropTarget("CARD", cardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	})),
  connect(mapStateToProps, mapDispatchToProps)
)(Card);
