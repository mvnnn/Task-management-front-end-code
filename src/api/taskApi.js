class TaskApi {

  static createTask(task_title, task_description, task_status, member_name, project_title, task_id) {
    return fetch('http://localhost:4000/createTask', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task_title, task_description, task_status, member_name, project_title, task_id})}).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateTaskStatus(project_title, member_name, task_id, status) {
    return fetch('http://localhost:4000/updateTaskStatus', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({project_title, member_name, task_id, status})}).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

}

export default TaskApi;
