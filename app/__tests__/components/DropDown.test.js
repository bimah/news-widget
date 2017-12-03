import React from 'react';
import { shallow } from 'enzyme';
import DropDown from '../../components/DropDown/main';

describe('DropDown component', () => {
  const initProps = {
    options: [
      {
        label: 'Please Select',
        value: '',
      },
      {
        label: 'filter 1',
        value: 'filter-1',
      },
    ],
  };

  it('should have two options', () => {
    const dropDown = shallow(<DropDown {...initProps} />);
    expect(dropDown.find('.dropdown').getElement().props.children.props.children.length).toEqual(2);
  });
});
