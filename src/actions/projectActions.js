import * as types from './actionTypes';
import ProjectApi from '../api/projectApi';

export function loadProjectSuccess(projects) {
  console.log(projects);
  return {type: types.LOAD_PROJECTS_SUCCESS, projects};
}

export function createProjectSuccess(task_title, task_description, members) {
  return {type: types.CREATE_PROJECTS_SUCCESS,
    task_title,
    task_description,
    members
  }
}


export function loadProjects() {
  return function(dispatch) {
    return ProjectApi.getAllProjects().then(projects => {
      dispatch(loadProjectSuccess(projects));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createProject(task_title, task_description, members) {
  return function (dispatch) {
    return ProjectApi.createProject(task_title, task_description, members).then(responseProject => {
      dispatch(createProjectSuccess(task_title, task_description, members));
      return responseProject;
    }).catch(error => {
      throw(error);
    });
  };
}
