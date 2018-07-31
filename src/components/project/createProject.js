import React from "react";
import PropTypes from 'prop-types';
import Cssmodules from "react-css-modules";

import styles from "./createProject.scss";
import Container from '../../containers/Container';
import AddMember from '../../containers/addMember';
import CreateTask from '../../containers/createTask';

const CreateProject = ({ members_data, projectTitle }) => {
	return (
	<div className="create-project-component">
      {
        members_data ? (
  members_data.map((data, i) => {
    return <div id="members" key={i} className="grid taskgrid">
      <div className="card">
      <h5 className="style-grid">{data.member_name}</h5>
      </div>
      <Container id={i} CNumber={i} list={data.tasks} memberName={data.member_name} projectTitle={projectTitle} />
          <CreateTask memberName={data.member_name} projectTitle={projectTitle}/>
    </div>
  })
    ) : null
      }
        <div className="grid add-membergrid" >
        <AddMember projectTitle={projectTitle} />
      </div>
	</div>
	);
};

CreateProject.displayName = "CreateProject";
CreateProject.propTypes = {
    members_data: PropTypes.array.isRequired,
	projectTitle: PropTypes.string.isRequired,
};
CreateProject.defaultProps = {};

export default Cssmodules(CreateProject, styles);