class ProjectApi {
  static getAllProjects() {
    return fetch('http://localhost:4000/project').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createProject(task_title, task_description, members) {
    return fetch('http://localhost:4000/project', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task_title, task_description, members})}).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default ProjectApi;
