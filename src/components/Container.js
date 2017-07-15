import React, { Component } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/projectActions';

export class Container extends Component {

	constructor(props) {
		super(props);
		this.state = { cards: [] };
	}

  componentDidMount () {
    this.setState({ cards: this.props.list });
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      cards : this.props.list
    });
  }

	pushCard(card) {
		this.setState(update(this.state, {
			cards: {
				$push: [ card ]
			}
		}));
	}

	removeCard(index) {
		this.setState(update(this.state, {
			cards: {
				$splice: [
					[index, 1]
				]
			}
		}));
	}

	moveCard(dragIndex, hoverIndex) {
		let { cards } = this.state;
		let dragCard = cards[dragIndex];

		this.setState(update(this.state, {
			cards: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard]
				]
			}
		}));
	}

	render() {
		let { cards } = this.state;
		let { canDrop, isOver, connectDropTarget } = this.props;
		let isActive = canDrop && isOver;
		const style = {
      minWidth: '200px',
			width: (0.20)*window.innerWidth,
		};

		const backgroundColor = isActive ? '#00b386' : '#FFF';
    const height = cards.length == 0 ? '50px': 'auto';

		return connectDropTarget(
			<div style={Object.assign({}, style,backgroundColor,height)}>
				{cards.map((card, i) => {
					return (
						<Card
							key={card.id}
							index={i}
							listId={this.props.id}
							card={card}
              projectTitle={this.props.projectTitle}
              memberName={this.props.memberName}
							removeCard={() => this.removeCard()}
							moveCard={() => this.moveCard()} />
					);
				})}
			</div>
		);
  }
}

const cardTarget = {
	drop(props, monitor, component ) {
		const { id } = props;
		const sourceObj = monitor.getItem();
		if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
		return {
			listId: id
		};
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

export default flow(
  DropTarget("CARD", cardTarget, (connect, monitor) => ({
  	connectDropTarget: connect.dropTarget(),
  	isOver: monitor.isOver(),
  	canDrop: monitor.canDrop()
  })),
  connect(mapStateToProps, mapDispatchToProps)
)(Container);
