import {combineReducers} from 'redux';
import projects from './projectReducer';
import tasks from './taskReducer';

const rootReducer = combineReducers({
  projects,
  tasks
})

export default rootReducer;
