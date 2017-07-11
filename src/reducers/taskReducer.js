import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function projectReducer(state = initialState.projects, action) {
  switch(action.type) {
    case types.LOAD_PROJECTS_SUCCESS:
    return {
      projects: action.projects
    }
    default:
      return state;
  }
}
