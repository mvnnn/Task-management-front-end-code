import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function projectReducer(state = initialState.projects, action) {
  switch(action.type) {
    case types.CREATE_MEMBERS_SUCCESS:

    console.log(state.projects);
    function search(projects, project_title){
    for (let i=0; i < projects.length; i++) {
        if (projects[i].project_title === project_title) {
            return i;
        }
      }
      return null;
    }
    let ObjectIndex = search(state.projects, action.project_title);

    state.projects.members_task[ObjectIndex].tasks.push({
            task_title: action.task_title,
            task_description: action.task_title,
            status: action.task_status,
            id: action.task_id
          });

    return {
      projects: state.projects
    }
    default:
      return state;
  }
}
