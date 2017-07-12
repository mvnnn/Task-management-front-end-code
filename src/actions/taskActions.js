import * as types from './actionTypes';
import TaskApi from '../api/taskApi';

// export function createMemberSuccess(member_name) {
//   return {type: types.CREATE_MEMBERS_SUCCESS,
//     member_name
//   }
// }
//
// export function createTaskSuccess(task_title, task_description, task_status, member_name, project_title, task_id) {
//   return {type: types.CREATE_TASK_SUCCESS,
//     task_title,
//     task_description,
//     task_status,
//     member_name,
//     project_title,
//     task_id
//   }
// }
//
// export function createTask(task_title, task_description, task_status, member_name, project_title, task_id) {
//   console.log(task_title+","+task_description+","+task_status+","+member_name+","+project_title+","+task_id);
//   return function (dispatch) {
//     return TaskApi.createTask(task_title, task_description, task_status, member_name, project_title,task_id).then(responseProject => {
//       dispatch(createTaskSuccess(task_title, task_description, task_status, member_name, project_title,task_id));
//       return responseProject;
//     }).catch(error => {
//       throw(error);
//     });
//   };
// }
//
export function createMember() {
  console.log("working");
  // return function (dispatch) {
  //   return TaskApi.createMember(members).then(responseProject => {
  //     dispatch(createMemberSuccess(task_title, task_description, members));
  //     return responseProject;
  //   }).catch(error => {
  //     throw(error);
  //   });
  // };
}
