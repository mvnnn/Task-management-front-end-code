import * as types from './actionTypes';
import ProjectApi from '../api/projectApi';
import TaskApi from '../api/taskApi';

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

export function createTaskSuccess(task_title, task_description, task_status, member_name, project_title, task_id) {
  return {type: types.CREATE_TASK_SUCCESS,
    task_title,
    task_description,
    task_status,
    member_name,
    project_title,
    task_id
  }
}

export function updateTaskSuccess(project_title, member_name, task_id, status) {
  return {type: types.UPDATE_TASK_STATUS_SUCCESS,
    project_title,
    member_name,
    task_id,
    status
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


export function createTask(task_title, task_description, task_status, member_name, project_title, task_id) {
  console.log(task_title+","+task_description+","+task_status+","+member_name+","+project_title+","+task_id);
  return function (dispatch) {
    return TaskApi.createTask(task_title, task_description, task_status, member_name, project_title,task_id).then(responseProject => {
      dispatch(createTaskSuccess(task_title, task_description, task_status, member_name, project_title,task_id));
      return responseProject;
    }).catch(error => {
      throw(error);
    });
  };
}


export function updateTaskStatus(project_title, member_name, task_id, status) {
  return function (dispatch) {
    return TaskApi.updateTaskStatus(project_title, member_name, task_id, status).then(responseProject => {
      dispatch(updateTaskSuccess(project_title, member_name, task_id, status));
      return responseProject;
    }).catch(error => {
      throw(error);
    });
  };
}
