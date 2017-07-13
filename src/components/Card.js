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

let styles = {
  grid1: {
    display: 'inline-block',
    width: (0.17)*window.innerWidth,
    whiteSpace: 'normal',
    textAlign: 'left',
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: '0.3s',
    marginTop: '4%',
    cursor: 'move',
    backgroundColor: '#f2f2f2'
  }
}

class Card extends Component {
  constructor(props) {
   super(props);
  }

  changeStatus = (value) => {
    this.props.actions.updateTaskStatus(this.props.projectTitle,this.props.memberName,this.props.card.id, value);
    console.log(this.props.card.id+","+this.props.projectTitle+","+this.props.memberName);
  }

	render() {
		const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

    const styleGrid = {
      margin: '4%',
      textAlign: 'left',
      paddingLeft: '2%',
      cursor: 'move'
    };

		return connectDragSource(connectDropTarget(
      <div style={styles.grid1}>
      <div style={styleGrid}>
        <Row className="show-grid">
        <Col xs={6} md={6}>
        <h6 style={{color:'black'}}>{card.task_title} </h6>
        </Col>
        <Col xs={4} md={4}>
        <ButtonToolbar>
          <DropdownButton bsSize="xsmall" title={card.status} id="dropdown-size-extra-small" >
            <MenuItem eventKey="1" onSelect={this.changeStatus.bind(this, "Done")}>Done</MenuItem>
            <MenuItem eventKey="2" onSelect={this.changeStatus.bind(this, "On Hold")}>On Hold</MenuItem>
            <MenuItem eventKey="3" onSelect={this.changeStatus.bind(this, "In Process")}>In Process</MenuItem>
            <MenuItem eventKey="4" onSelect={this.changeStatus.bind(this, "Sent")}>Sent</MenuItem>
            <MenuItem eventKey="5" onSelect={this.changeStatus.bind(this, "Schedule")}>Schedule</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
        </Col>
      </Row>

        {card.task_description}</div>
      </div>
		));
	}
}

const cardSource = {

	beginDrag(props) {
    // console.log(props.index, props.listId, props.card);
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
      // console.log(props.index+","+props.listId+","+props.card.id+","+item.index+","+dropResult.listId);
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
