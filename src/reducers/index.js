import {combineReducers} from 'redux';
import projects from './projectReducer';

const rootReducer = combineReducers({
  projects
})

export default rootReducer;
