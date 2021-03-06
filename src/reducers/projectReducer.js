import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function projectReducer(state = initialState.projects, action) {
  switch(action.type) {
    case types.LOAD_PROJECTS_SUCCESS:
    return {
      projects: action.projects
    }
    case types.CREATE_PROJECTS_SUCCESS:
    function search(projects, project_title){
    for (let i=0; i < projects.length; i++) {
        if (projects[i].project_title === project_title) {
            return i;
        }
      }
      return null;
    }
    let ObjectIndex = search(state.projects, action.project_title);

    if(ObjectIndex != null){
      state.projects[ObjectIndex] = {
        project_title: action.project_title,
        project_description: action.project_description,
        members: action.members,
        members_task: []
      }
    }
    else{
      state.projects.push({
        project_title: action.project_title,
        project_description: action.project_description,
        members: action.members,
        members_task: []
      });
    }

    return {
      projects: state.projects
    }

    case types.CREATE_TASK_SUCCESS:

    function searchByTitle(projects, project_title){
    for (let i=0; i < projects.length; i++) {
        if (projects[i].project_title === project_title) {
            return i;
        }
      }
      return null;
    }
    let ObjectIndex1 = searchByTitle(state.projects, action.project_title);


    function searchByName(members_task, member_name){
      for (let i=0; i < members_task.length; i++) {
        if (members_task[i].member_name === member_name) {
          return i;
        }
      }
      return null;
    }
    let ObjectIndex2 = searchByName(state.projects[ObjectIndex1].members_task, action.member_name);

    state.projects[ObjectIndex1].members_task[ObjectIndex2].tasks.push({
            task_title: action.task_title,
            task_description: action.task_description,
            status: action.task_status,
            id: action.task_id
          });

    return {
      projects: state.projects
    }


    case types.UPDATE_TASK_STATUS_SUCCESS:

    function searchByTitles(projects, project_title){
    for (let i=0; i < projects.length; i++) {
        if (projects[i].project_title === project_title) {
            return i;
        }
      }
      return null;
    }
    let ProjectObjectIndex = searchByTitles(state.projects, action.project_title);


    function searchByNames(members_task, member_name){
      for (let i=0; i < members_task.length; i++) {
        if (members_task[i].member_name === member_name) {
          return i;
        }
      }
      return null;
    }
    let MemberObjectIndex = searchByNames(state.projects[ProjectObjectIndex].members_task, action.member_name);

    function searchByTask(tasks, id){
      for (let i=0; i < tasks.length; i++) {
        if (tasks[i].id === id) {

          state.projects[ProjectObjectIndex].members_task[MemberObjectIndex].tasks[i] =  {
            task_title : tasks[i].task_title,
            task_description : tasks[i].task_description,
            status : action.status,
            id : tasks[i].id
          }
          return i;
        }
      }
      return null;
    }
    searchByTask(state.projects[ProjectObjectIndex].members_task[MemberObjectIndex].tasks, action.task_id);

    return {
      projects: state.projects
    }

    case types.CARD_DRAG_AND_DROP_SUCCESS:

    function searchByTitl(projects, project_title){
    for (let i=0; i < projects.length; i++) {
        if (projects[i].project_title === project_title) {
            return i;
        }
      }
      return null;
    }
    let ProjectObjectIndex1 = searchByTitl(state.projects, action.project_title);


    function searchByTasks(tasks, id){
      for (let i=0; i < tasks.length; i++) {
        if (tasks[i].id === id) {

          state.projects[ProjectObjectIndex1].members_task[action.dropListId].tasks.push({
                  task_title : tasks[i].task_title,
                  task_description : tasks[i].task_description,
                  status : tasks[i].status,
                  id : tasks[i].id
                });

          state.projects[ProjectObjectIndex1].members_task[action.dragListId].tasks.splice(i, 1);

          return i;
        }
      }
      return null;
    }
    searchByTasks(state.projects[ProjectObjectIndex1].members_task[action.dragListId].tasks, action.cardId);

    return {
      projects: state.projects
    }

    case types.CREATE_MEMBERS_SUCCESS:
    function searchTitle(projects, project_title){
    for (let i=0; i < projects.length; i++) {
        if (projects[i].project_title === project_title) {
            return i;
        }
      }
      return null;
    }
    let ProjctObjectIndex = searchTitle(state.projects, action.project_title);

    state.projects[ProjctObjectIndex].members_task.push({
      member_name: action.member_name,
      tasks: []
    });

    return {
      projects: state.projects
    }

    default:
      return state;
  }
}
