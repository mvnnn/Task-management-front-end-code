import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

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

	render() {
		const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

    const styleGrid = {
      margin: '4%',
      padding: '10%',
      textAlign: 'left',
      cursor: 'move'
    };

		return connectDragSource(connectDropTarget(
      <div style={styles.grid1}>
      <h5 style={styleGrid}><span style={{color:'black'}}>{card.task_title}</span><br />
        {card.task_description}</h5>
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

export default flow(
	DropTarget("CARD", cardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Card);
