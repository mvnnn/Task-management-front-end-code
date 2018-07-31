import React from "react";
import PropTypes from "prop-types";
import Cssmodules from "react-css-modules";

import styles from "./taskCard.scss";
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

class CardComponent extends React.Component {
	constructor(props) {
		super(props);
    }
    
    render() {
        const { card, changeStatus } = this.props;

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
      borderLeft : `2px solid ${Color}`
    };

    const statusButton = {
      backgroundColor: `${Color}`,
    };

	return (
	<div className="card-component" style={cardStyle}>
      <div className="style-grid">
        <div className="flex">
        <div>
        <h6>{card.task_title} </h6>
        </div>
        <div className="button-bar">
        <ButtonToolbar className="button-background">
          <DropdownButton style={statusButton} bsStyle={statusButton} bsSize="xsmall" title={card.status} id="dropdown-size-extra-small" >
            <MenuItem eventKey="1" onSelect={() => changeStatus("Done", card.status)}>Done</MenuItem>
            <MenuItem eventKey="2" onSelect={() => changeStatus("On Hold", card.status)}>On Hold</MenuItem>
            <MenuItem eventKey="3" onSelect={() => changeStatus("In Process", card.status)}>In Process</MenuItem>
            <MenuItem eventKey="4" onSelect={() => changeStatus("Sent", card.status)}>Sent</MenuItem>
            <MenuItem eventKey="5" onSelect={() => changeStatus("Schedule", card.status)}>Schedule</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
        </div>
      </div>

        <div className="task-desc">{card.task_description}</div></div>
      </div>
    );
}
};

CardComponent.displayName = "CardComponent";
CardComponent.propTypes = {
  card: PropTypes.array,
  changeStatus: PropTypes.func
};
CardComponent.defaultProps = {};

export default Cssmodules(CardComponent, styles)