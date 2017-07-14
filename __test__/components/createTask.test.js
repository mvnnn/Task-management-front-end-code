import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import {CreateTask} from '../../src/components/createTask';

function setup() {
  const props = {
    createTask: jest.fn()
  }

  const enzymeWrapper = mount(<CreateTask {...props} />)

  return {
    props,
    enzymeWrapper
  }
}


describe('components', () => {
  it('should render self and subcomponents of CreateTask', () => {
        const { enzymeWrapper } = setup()

        expect(enzymeWrapper.find('h5#createTask').text()).to.equal('Create Task')

      });



  it('should not call createTask if length of title is null', () => {
    const { enzymeWrapper, props } = setup()

    const wrapper = shallow(<CreateTask {...props} />);

    wrapper.setState({ showCreateTaskModal:true, taskTitleStatus: "error", taskDescriptionStatus:"success"});
    const input = wrapper.find('Button#submit');

    input.props().onClick()
    expect(props.createTask.mock.calls).to.have.length(0);
    });

  it('should not call createTask if length of Task and Description is null', () => {
    const { enzymeWrapper, props } = setup()

    const wrapper = shallow(<CreateTask {...props} />);

    wrapper.setState({ showCreateTaskModal:true, taskTitleStatus: "error", taskDescriptionStatus:"error"});
    const input = wrapper.find('Button#submit');

    input.props().onClick()
    expect(props.createTask.mock.calls).to.have.length(0);
    });

  it('should not call createTask if length of Description is null', () => {
    const { enzymeWrapper, props } = setup()

    const wrapper = shallow(<CreateTask {...props} />);

    wrapper.setState({ showCreateTaskModal:true, taskTitleStatus: "success"});
    const input = wrapper.find('Button#submit');

    input.props().onClick()
    expect(props.createTask.mock.calls).to.have.length(0);
    });

})
