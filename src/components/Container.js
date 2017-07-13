import React, { Component } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/projectActions';

class Container extends Component {

	constructor(props) {
		super(props);
		this.state = { cards: [] };
	}

  componentDidMount () {
    this.setState({ cards: this.props.list });
  }

  componentWillReceiveProps = (nextProps) => {
    const { projects } = this.props.projects;
    // console.log("updateCCCC====>"+projects+".."+nextProps.projectTitle);
    // function searchByTitle(projects, project_title){
    // for (let i=0; i < projects.length; i++) {
    //     if (projects[i].project_title === project_title) {
    //         return projects[i];a
    //     }
    //   }
    //   return null;
    // }
    // let ObjectIndex1 = searchByTitle(projects, nextProps.projectTitle);
    //
    // console.log("Update"+JSON.stringify(ObjectIndex1.members_task));
    // let JSONObject = JSON.stringify(ObjectIndex1);
    // let data = (this.props.projects)[ObjectIndex1].members_task;
    // console.log("INDEX"+ projects[ObjectIndex1].members_task);
    // this.forceUpdate(ObjectIndex1.members_task);
    // this.setState({
    //   cards : nextProps.list
    // });
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
			width: (0.17)*window.innerWidth,
		};

		const backgroundColor = isActive ? 'lightgreen' : '#FFF';
    const height = cards.length == 0 ? '50px': 'auto';

		return connectDropTarget(
			<div style={{...style, backgroundColor, height}}>
				{cards.map((card, i) => {
					return (
						<Card
							key={card.id}
							index={i}
							listId={this.props.id}
							card={card}
              projectTitle={this.props.projectTitle}
              memberName={this.props.memberName}
							removeCard={this.removeCard.bind(this)}
							moveCard={this.moveCard.bind(this)} />
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
