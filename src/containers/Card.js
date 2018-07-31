import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/projectActions';
import TaskCardComponent from '../components/task/card/taskCard';

export class Card extends Component {
  constructor(props) {
   super(props);
   this.changeStatus=this.changeStatus.bind(this);
  }

  changeStatus(value, oldStatus){
    if(value !== oldStatus){
      this.props.actions.updateTaskStatus(this.props.projectTitle,this.props.memberName,this.props.card.id, value);
    }
  }

	render() {
		const { connectDragSource, connectDropTarget } = this.props;


		return connectDragSource(connectDropTarget(
      <div>
      <TaskCardComponent
      card={this.props.card}
      changeStatus={this.changeStatus}
      />
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

function mapStateToProps(state) {
    return {}
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
