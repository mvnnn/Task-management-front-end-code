import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import {TaskManagement} from '../../src/components/taskManagement';

let project = {projects:[
  {
    project_title: "Social Selling",
    members_task: [
        {
            member_name: "Alex Merchant",
            tasks: [
                {
                    task_title: "First Task",
                    task_description: "That's your first task",
                    status: "In Process",
                    id: "aqYv0First TaskF4PYM"
                }
            ]
        }
    ],
    members: 8,
    project_description: "It is a module which helps use to post in multiple channel at once."
}, {
    project_title: "Social Selling1",
    members_task: [
        {
            member_name: "Alex Merchant",
            tasks: [
                {
                    task_title: "First Task",
                    task_description: "That's your first task",
                    status: "In Process",
                    id: "aqYv0First TaskF4PYM"
                }
            ]
        }
    ],
    members: 8,
    project_description: "It is a module which helps use to post in multiple channel at once."
}

]};
function setup() {
  const props = {
    createProject: jest.fn()
  }

  const enzymeWrapper = mount(<TaskManagement {...props} projects={project} />)

  return {
    props,
    enzymeWrapper
  }
}


describe('components', () => {
  it('should render self and subcomponents of TaskManagement', () => {
        const { enzymeWrapper } = setup()

        expect(enzymeWrapper.find('h5#createProject').text()).to.equal('Create New Project')

      });

  it('should not call createProject if length of title is null', () => {
    const { enzymeWrapper, props } = setup()

    const wrapper = shallow(<TaskManagement {...props} projects={project} />);

      wrapper.setState({ showCreateProjectModal:true, projectTitleStatus: 'error',  projectDescriptionStatus: 'success'});

    const input = wrapper.find('Button#submit');

    input.props().onClick()
    expect(props.createProject.mock.calls).to.have.length(0);
    });

  it('should not call createProject if length of description is null', () => {
    const { enzymeWrapper, props } = setup()

    const wrapper = shallow(<TaskManagement {...props} projects={project} />);

      wrapper.setState({ showCreateProjectModal:true, projectTitleStatus: 'success',  projectDescriptionStatus: 'false'});

    const input = wrapper.find('Button#submit');

    input.props().onClick()
    expect(props.createProject.mock.calls).to.have.length(0);
    });

  it('render project list item', () => {
    const { props } = setup()

    const wrapper = shallow(<TaskManagement {...props} projects={project} />);

      expect(wrapper.find('Col#projects')).to.have.length(project.projects.length);
    });
})
