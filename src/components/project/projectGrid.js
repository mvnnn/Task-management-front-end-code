import React from "react";
import PropTypes from 'prop-types';
import Cssmodules from "react-css-modules";

import styles from "./projectGrid.scss";
import { Grid, Row, Col, Glyphicon} from 'react-bootstrap';

const ProjectGrid = ({ goToProjectDetails, openCreateProjectModal, projects}) => {
	return (
	<div className="project-grid-component">
        <Grid className="grid">
      <Row className="show-grid">
        {
          projects ? (
    projects.map((project, i) => {
      return <Col id="projects" key={i} xs={11} md={3} sm={5} className="card" onClick={(e) => goToProjectDetails(e, project.project_title, project.members_task, projects)}>
      <h3>{project.project_title}</h3>
      <p>{project.project_description}</p>
      <h5 style={{fontWeight:'bold'}}>Total Members : {project.members}</h5>
      </Col>
    })
      ) : null
        }
        <Col xs={11} md={3} sm={5} className="add-project-card" onClick={() => openCreateProjectModal()}>
          <Glyphicon glyph="plus-sign" />
          <h5 id="createProject" className="create-project">Create New Project</h5>
        </Col>
        </Row>
        </Grid>
	</div>
	);
};

ProjectGrid.displayName = "ProjectGrid";
ProjectGrid.propTypes = {
  goToProjectDetails: PropTypes.func,
  openCreateProjectModal: PropTypes.func,
  projects: PropTypes.array.isRequired
};
ProjectGrid.defaultProps = {};

export default Cssmodules(ProjectGrid, styles);