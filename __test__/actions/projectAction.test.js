import * as actions from '../../src/actions/projectActions';
import * as types from '../../src/actions/actionTypes';

const projectData = [{
    project_title: "Publishing",
    project_description: "It is a module which helps use to post in multiple channel at once.",
    members: 12,
    members_task: [
        {
            member_name: "Abhinav Singi",
            tasks: [
                {
                    task_title: "Scheduler",
                    task_description: "that's test case",
                    status: "In Process",
                    id: "6d8OfSchedulerV5Syx"
                }
            ]
        },
        {
            member_name: "Surbhi Gupta",
            tasks: [
                {
                    task_title: "Icon Creation",
                    task_description: "Needed new icon set.",
                    status: "Done",
                    id: "cDef1Icon Creation27up6"
                }
            ]
        },
        {
            member_name: "Abhishek Patel",
            tasks: [
                {
                    task_title: "Publishing View",
                    task_description: "Include all channels preview.",
                    status: "On Hold",
                    id: "cDef1Publishing View27up6"
                }
            ]
        }]
      }];

describe('Project Actions', () => {
  it('should load project data success', () => {
    const projects = projectData;
    const expectedAction = {
      type: types.LOAD_PROJECTS_SUCCESS,
      projects
    }
    expect(actions.loadProjectSuccess(projects)).toEqual(expectedAction)
  })

  it('should create project success', () => {
    const project_title = "Publishing";
    const project_description = "It is a module which helps use to post in multiple channel at once.";
    const members = 14;
    const expectedAction = {
      type: types.CREATE_PROJECTS_SUCCESS,
      project_title,
      project_description,
      members
    }
    expect(actions.createProjectSuccess(project_title,project_description,members)).toEqual(expectedAction)
  })

  it('should create task success', () => {
    const task_title = "NewTask";
    const task_description = "It's task test case";
    const task_status = "In Process";
    const member_name = "Alex";
    const project_title = "Publishing";
    const task_id = "fd5bgNewTaskTy8Jp"
    const expectedAction = {
      type: types.CREATE_TASK_SUCCESS,
      task_title,
      task_description,
      task_status,
      member_name,
      project_title,
      task_id
    }
    expect(actions.createTaskSuccess(task_title, task_description, task_status, member_name, project_title, task_id)).toEqual(expectedAction)
  });


  it('should update task status success', () => {
    const project_title = "Publishing";
    const member_name = "Alex";
    const task_id = "fd5bgNewTaskTy8Jp"
    const status = "In Process";
    const expectedAction = {
      type: types.UPDATE_TASK_STATUS_SUCCESS,
      project_title,
      member_name,
      task_id,
      status
    }
    expect(actions.updateTaskSuccess(project_title, member_name, task_id, status)).toEqual(expectedAction)
  });


  it('should task card drag and drop success', () => {
    const project_title = "Publishing";
    const cardId = "fd5bgNewTaskTy8Jp"
    const dropListId = 0;
    const dragListId = 1;
    const expectedAction = {
      type: types.CARD_DRAG_AND_DROP_SUCCESS,
      dragListId,
      dropListId,
      cardId,
      project_title
    }
    expect(actions.dragAndDropCardUpdateSuccess(dragListId, dropListId, cardId, project_title)).toEqual(expectedAction)
  });


  it('should add member success', () => {
    const project_title = "Publishing";
    const member_name = "Alex"
    const expectedAction = {
      type: types.CREATE_MEMBERS_SUCCESS,
      member_name,
      project_title
    }
    expect(actions.addMemberSuccess(member_name, project_title)).toEqual(expectedAction)
  });

})
