import reducer from '../../src/reducers/projectReducer';
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



describe('Project Reducer', () => {

  it('has a defult state', () => {
    expect(reducer(undefined, {type: 'unexpected'})).toEqual([]);
  });

  it('should handle LOAD_PROJECTS_SUCCESS', () => {
    expect(reducer(undefined, {
      type: types.LOAD_PROJECTS_SUCCESS,
      projects: [{"aa":0}]
    })).toEqual({"projects": [{"aa": 0}]});
  });


  it('should handle CREATE_PROJECTS_SUCCESS', () => {
      expect(
        reducer({projects: [{
          project_title: "Distributed",
          project_description: "It is a module which helps use to post in multiple channel at once.",
          members: 12,
          members_task: []
        }]},
          {
            type: types.CREATE_PROJECTS_SUCCESS,
            project_title: "Publishing",
            project_description: "It is a module which helps use to post in multiple channel at once.",
            members: 12,

          }
        )
      ).toEqual({"projects": [{"members": 12, "members_task": [], "project_description": "It is a module which helps use to post in multiple channel at once.", "project_title": "Distributed"},
      {"members": 12, "members_task": [], "project_description": "It is a module which helps use to post in multiple channel at once.", "project_title": "Publishing"}]}
      )
    });


    it('should handle CREATE_TASK_SUCCESS', () => {
        expect(
          reducer({projects: projectData},
            {
              type: types.CREATE_TASK_SUCCESS,
              project_title: "Publishing",
              member_name: "Abhinav Singi",
              task_title: "Test case",
              task_description: "That's Sample test case",
              task_status: "Done",
              task_id: "156adTest casetYS3T"
            }
          )
        ).toEqual({"projects": [{
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
                        },
                        {
                            task_title: "Test case",
                            task_description: "That's Sample test case",
                            status: "Done",
                            id: "156adTest casetYS3T"
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
              }]
      })
      });



      it('should handle UPDATE_TASK_STATUS_SUCCESS', () => {
          expect(
            reducer({projects: projectData},
              {
                type: types.UPDATE_TASK_STATUS_SUCCESS,
                project_title: "Publishing",
                member_name: "Surbhi Gupta",
                status: "On Hold",
                task_id: "cDef1Icon Creation27up6"
              }
            )
          ).toEqual({"projects": [{
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
                          },
                          {
                              task_title: "Test case",
                              task_description: "That's Sample test case",
                              status: "Done",
                              id: "156adTest casetYS3T"
                          }
                      ]
                  },
                  {
                      member_name: "Surbhi Gupta",
                      tasks: [
                          {
                              task_title: "Icon Creation",
                              task_description: "Needed new icon set.",
                              status: "On Hold",
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
                }]
        })
        });


        it('should handle CARD_DRAG_AND_DROP_SUCCESS', () => {
            expect(
              reducer({projects: projectData},
                {
                  type: types.CARD_DRAG_AND_DROP_SUCCESS,
                  project_title: "Publishing",
                  dropListId: 1,
                  dragListId: 0,
                  cardId: "6d8OfSchedulerV5Syx"
                }
              )
            ).toEqual({"projects": [{
                project_title: "Publishing",
                project_description: "It is a module which helps use to post in multiple channel at once.",
                members: 12,
                members_task: [
                    {
                        member_name: "Abhinav Singi",
                        tasks: [{
                                task_title: "Test case",
                                task_description: "That's Sample test case",
                                status: "Done",
                                id: "156adTest casetYS3T"
                            }
                        ]
                    },
                    {
                        member_name: "Surbhi Gupta",
                        tasks: [
                            {
                                task_title: "Icon Creation",
                                task_description: "Needed new icon set.",
                                status: "On Hold",
                                id: "cDef1Icon Creation27up6"
                            },
                            {
                                task_title: "Scheduler",
                                task_description: "that's test case",
                                status: "In Process",
                                id: "6d8OfSchedulerV5Syx"
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
                  }]
          })
          });


          it('should handle CREATE_MEMBERS_SUCCESS', () => {
              expect(
                reducer({projects: projectData},
                  {
                    type: types.CREATE_MEMBERS_SUCCESS,
                    project_title: "Publishing",
                    member_name: "Alex Merchant",
                  }
                )
              ).toEqual({"projects": [{
                  project_title: "Publishing",
                  project_description: "It is a module which helps use to post in multiple channel at once.",
                  members: 12,
                  members_task: [
                      {
                          member_name: "Abhinav Singi",
                          tasks: [{
                                  task_title: "Test case",
                                  task_description: "That's Sample test case",
                                  status: "Done",
                                  id: "156adTest casetYS3T"
                              }
                          ]
                      },
                      {
                          member_name: "Surbhi Gupta",
                          tasks: [
                              {
                                  task_title: "Icon Creation",
                                  task_description: "Needed new icon set.",
                                  status: "On Hold",
                                  id: "cDef1Icon Creation27up6"
                              },
                              {
                                  task_title: "Scheduler",
                                  task_description: "that's test case",
                                  status: "In Process",
                                  id: "6d8OfSchedulerV5Syx"
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
                      },
                      {
                        member_name: "Alex Merchant",
                        tasks: []
                      }
                    ]
                    }]
            })
            });


})
