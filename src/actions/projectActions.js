import * as types from './actionTypes';
import ProjectApi from '../api/projectApi';
import TaskApi from '../api/taskApi';

export function loadProjectSuccess(projects) {
  // console.log(projects);
  return {type: types.LOAD_PROJECTS_SUCCESS, projects};
}


export function createProjectSuccess(project_title, project_description, members) {
  return {type: types.CREATE_PROJECTS_SUCCESS,
    project_title,
    project_description,
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

export function dragAndDropCardUpdateSuccess(dragListId, dropListId, cardId, project_title) {
  return {type: types.CARD_DRAG_AND_DROP_SUCCESS,
    dragListId,
    dropListId,
    cardId,
    project_title
  }
}

export function addMemberSuccess(member_name, project_title) {
  return {type: types.CREATE_MEMBERS_SUCCESS,
    member_name,
    project_title
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

export function createProject(project_title, project_description, members) {
  return function (dispatch) {
    return ProjectApi.createProject(project_title, project_description, members).then(responseProject => {
      dispatch(createProjectSuccess(project_title, project_description, members));
      return responseProject;
    }).catch(error => {
      throw(error);
    });
  };
}


export function createTask(task_title, task_description, task_status, member_name, project_title, task_id) {
  // console.log(task_title+","+task_description+","+task_status+","+member_name+","+project_title+","+task_id);
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

export function dragAndDropCardUpdate(dragListId, dropListId, cardId, project_title) {
  return function (dispatch) {
    return TaskApi.dragAndDropCardUpdate(dragListId, dropListId, cardId, project_title).then(responseProject => {
      dispatch(dragAndDropCardUpdateSuccess(dragListId, dropListId, cardId, project_title));
      return responseProject;
    }).catch(error => {
      throw(error);
    });
  };
}

export function addMember(member_name, project_title) {
  return function (dispatch) {
    return TaskApi.addMember(member_name, project_title).then(responseProject => {
      dispatch(addMemberSuccess(member_name, project_title));
      return responseProject;
    }).catch(error => {
      throw(error);
    });
  };
}
