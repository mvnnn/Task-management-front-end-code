import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function projectReducer(state = initialState.projects, action) {
  switch(action.type) {
    case types.LOAD_PROJECTS_SUCCESS:
    return {
      projects: action.projects
    }
    case types.CREATE_PROJECTS_SUCCESS:
    function search(projects, task_title){
    for (let i=0; i < projects.length; i++) {
        if (projects[i].task_title === task_title) {
            return i;
        }
      }
      return null;
    }
    let ObjectIndex = search(state.projects, action.task_title);

    if(ObjectIndex != null){
      state.projects[ObjectIndex] = {
        task_title: action.task_title,
        task_description: action.task_description,
        members: action.members
      }
    }
    else{
      state.projects.push({
        task_title: action.task_title,
        task_description: action.task_description,
        members: action.members
      });
    }

    return {
      projects: state.projects
    }
    default:
      return state;
  }
}
