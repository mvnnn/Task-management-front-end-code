import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import {ProjectTasks} from '../../src/components/projectTasks';

const membersData = [
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
        },
        {
            member_name: "Lex",
            tasks: [
                {
                    task_title: "Second Task",
                    task_description: "That's your second task",
                    status: "In Process",
                    id: "aqYv0First TaskF4PYM"
                }
            ]
        }
    ];


describe('components', () => {
  it('should render self and subcomponents of ProjectTasks', () => {

        const wrapper = shallow(<ProjectTasks projectTitle="Publishing" members_data={membersData} />);
        expect(wrapper.find('a#ProjectHeaderTitle').text()).to.equal('Publishing')

      });

  it('render members list item', () => {

    const wrapper = shallow(<ProjectTasks />);

    wrapper.setState({ members_data:membersData});

    expect(wrapper.find('div#members')).to.have.length(2);

    });

})
