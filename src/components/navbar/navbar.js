import React from "react";
import PropTypes from "prop-types";
import Cssmodules from "react-css-modules";

import styles from "./navbar.scss";
import { Navbar } from 'react-bootstrap';

const Nav = ({children}) => {
	return (
	<div className="nav-component">
      <Navbar className="navbar" bsStyle="Green" fixedTop={true} >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#/project">Task Management</a>
          </Navbar.Brand>
        </Navbar.Header>
        {children}
      </Navbar>
		</div>
	);
};

Nav.displayName = "Navbar";
Nav.propTypes = {
  children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};
Nav.defaultProps = {};

export default Cssmodules(Nav, styles);
