import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions/projectActions';
import * as types from '../../src/actions/actionTypes';
import nock from 'nock';
import expect from 'expect'; // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions in project', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates LOAD_PROJECTS_SUCCESS when fetching projects has been done', () => {
    nock('http://localhost:4000')
      .get('/project')
      .reply(200, { todos: ['do something'] })

    const expectedActions = [
      { type: types.LOAD_PROJECTS_SUCCESS, projects: { todos: ['do something'] } }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.loadProjects()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  });


  it('creates CREATE_PROJECTS_SUCCESS when create new project', () => {
    nock('http://localhost:4000')
      .post('/project', {
                  project_title: 'Publishing',
                  project_description: 'It is demo project',
                  members: 10
                })
      .reply(201, { project_title: 'Publishing',project_description: 'It is demo project', members: 10 })

    const expectedActions = [
      { type: types.CREATE_PROJECTS_SUCCESS, project_title: 'Publishing',project_description: 'It is demo project', members: 10 }
    ]
    const store = mockStore({project_title:null, project_description:null, mumber:0})

    return store.dispatch(actions.createProject('Publishing','It is demo project',10)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  });


})
