import fetch from 'isomorphic-fetch';

class ProjectApi {
  static getAllProjects() {
    return fetch('http://localhost:4000/project').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createProject(project_title, project_description, members) {
    return fetch('http://localhost:4000/project', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({project_title, project_description, members})}).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default ProjectApi;
