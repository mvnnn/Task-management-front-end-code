import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import {TaskManagement} from '../../src/components/taskManagement';

let project = {projects:[{aa:0}]};
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
  it('should render self and subcomponents', () => {
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

      it('should not call createProject if length of title and description is null', () => {
        const { enzymeWrapper, props } = setup()

        const wrapper = shallow(<TaskManagement {...props} projects={project} />);

          wrapper.setState({ showCreateProjectModal:true, projectTitleStatus: 'error',  projectDescriptionStatus: 'false'});

        const input = wrapper.find('Button#submit');

        input.props().onClick()
        expect(props.createProject.mock.calls).to.have.length(0);
        });
})
