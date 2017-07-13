import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function projectReducer(state = initialState.projects, action) {
  switch(action.type) {
    default:
      return state;
  }
}
