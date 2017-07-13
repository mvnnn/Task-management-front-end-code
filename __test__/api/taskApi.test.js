import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions/projectActions';
import * as types from '../../src/actions/actionTypes';
import nock from 'nock';
import expect from 'expect'; // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions in task', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates CREATE_TASK_SUCCESS when create new task', () => {
    nock('http://localhost:4000')
      .post('/createTask', {
                  task_title: 'Test Task',
                  task_description: 'That is sample task',
                  task_status: 'Done',
                  member_name: 'Alex',
                  project_title: 'Publishing',
                  task_id: 'aer25Test TaskUt5Y9'
                })
      .reply(201, {
                  task_title: 'Test Task',
                  task_description: 'That is sample task',
                  task_status: 'Done',
                  member_name: 'Alex',
                  project_title: 'Publishing',
                  task_id: 'aer25Test TaskUt5Y9'
                })

    const expectedActions = [
      { type: types.CREATE_TASK_SUCCESS, task_title: 'Test Task',
                        task_description: 'That is sample task',
                        task_status: 'Done',
                        member_name: 'Alex',
                        project_title: 'Publishing',
                        task_id: 'aer25Test TaskUt5Y9'}
    ]
    const store = mockStore({task_title: null, task_description: null, task_status: null, member_name: null, project_title: null, task_id: null})

    return store.dispatch(actions.createTask('Test Task', 'That is sample task', 'Done', 'Alex', 'Publishing', 'aer25Test TaskUt5Y9')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  });


  it('update UPDATE_TASK_STATUS_SUCCESS when update task status', () => {
    nock('http://localhost:4000')
      .post('/updateTaskStatus', {
                  member_name: 'Alex',
                  project_title: 'Publishing',
                  task_id: 'aer25Test TaskUt5Y9',
                  status: 'Done'
                })
      .reply(201, {
                  member_name: 'Alex',
                  project_title: 'Publishing',
                  task_id: 'aer25Test TaskUt5Y9',
                  status: 'Done'
                })

    const expectedActions = [
      { type: types.UPDATE_TASK_STATUS_SUCCESS, member_name: 'Alex',
                                          project_title: 'Publishing',
                                          task_id: 'aer25Test TaskUt5Y9',
                                          status: 'Done'}
    ]
    const store = mockStore({project_title: null, member_name: null, task_id: null, status: null})

    return store.dispatch(actions.updateTaskStatus('Publishing', 'Alex', 'aer25Test TaskUt5Y9', 'Done')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  });



  it('update CARD_DRAG_AND_DROP_SUCCESS when update cards', () => {
    nock('http://localhost:4000')
      .post('/updateTaskStatus', {
                  dragListId : 1,
                  dropListId : 0,
                  cardId: 'aer25Test TaskUt5Y9',
                  project_title: 'Publishing'
                })
      .reply(201, {
                  dragListId : 1,
                  dropListId : 0,
                  cardId: 'aer25Test TaskUt5Y9',
                  project_title: 'Publishing'
                })

    const expectedActions = [
      { type: types.CARD_DRAG_AND_DROP_SUCCESS,   dragListId : 1,
                                                  dropListId : 0,
                                                  cardId: 'aer25Test TaskUt5Y9',
                                                  project_title: 'Publishing'}
    ]
    const store = mockStore({dragListId: null, dropListId: null, cardId: null, project_title: null})

    return store.dispatch(actions.dragAndDropCardUpdate(1, 0, 'aer25Test TaskUt5Y9', 'Publishing')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  });


  it('create CREATE_MEMBERS_SUCCESS when add member done', () => {
    nock('http://localhost:4000')
      .post('/updateTaskStatus', {
                  member_name: 'Alex Merchant',
                  project_title: 'Publishing'
                })
      .reply(201, {
                  member_name: 'Alex Merchant',
                  project_title: 'Publishing'
                })

    const expectedActions = [
      { type: types.CREATE_MEMBERS_SUCCESS, member_name: 'Alex Merchant', 
        project_title: 'Publishing'}
    ]
    const store = mockStore({  member_name: null, project_title: null})

    return store.dispatch(actions.addMember('Alex Merchant', 'Publishing')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  });


})
