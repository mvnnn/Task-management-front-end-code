import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import {AddMember} from '../../src/components/addMember';

function setup() {
  const props = {
    addMember: jest.fn(),
    closeCreateMemberModal: jest.fn()
  }

  const enzymeWrapper = mount(<AddMember {...props} />)

  return {
    props,
    enzymeWrapper
  }
}


describe('components', () => {
  it('should render self and subcomponents of AddMember', () => {
        const { enzymeWrapper } = setup()

        expect(enzymeWrapper.find('h5#addNewMember').text()).to.equal('Add New Member')

      });

  it('should not call addMember if length of member name is null', () => {
    const { enzymeWrapper, props } = setup()

    const wrapper = shallow(<AddMember {...props} />);

    wrapper.setState({showCreateMemberModal:true, memberNameStatus: 'error'});
    const input = wrapper.find('Button#submit');

    input.props().onClick()
    expect(props.addMember.mock.calls).to.have.length(0);

    });

})
