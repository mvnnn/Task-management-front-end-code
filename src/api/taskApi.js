class TaskApi {

  static createTask(task_title, task_description, status) {
    return fetch('http://localhost:4000/project', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task_title, task_description, status})}).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default TaskApi;
