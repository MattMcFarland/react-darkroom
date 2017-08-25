import React from 'react';

import { shallow, mount, render } from 'enzyme';
import * as FilePickerModule from '../FilePicker';

const FilePicker = FilePickerModule.default;
const FilePickerClass = FilePickerModule.FilePicker;

const { describe, test, expect } = global;

const FilePickerNode = (
  <FilePicker>
    <button>test</button>
  </FilePicker>);

const createFilepicker = () => mount(FilePickerNode).find(FilePickerClass);


describe('FilePicker', () => {
  describe('Rendering', () => {
    test('should render an input field as a child', () => {
      expect(createFilepicker().find('input').length).toEqual(1);
    });
    test('multiple filepickers must contain their own UUIDs to have unique refs', () => {
      const uuidHash =
        [createFilepicker(), createFilepicker(), createFilepicker(), createFilepicker()]
          .map(fp => fp.props().uuid)
          .reduce((hash, uuid) => Object.assign(hash, { [uuid]: uuid }), {});
      expect(Object.keys(uuidHash).length).toEqual(4);
    });
  });
  describe('onClick', () => {
    test('triggers the call of click on the hidden input tag', () => {
      const wrapper = createFilepicker();
      const input = wrapper.find('input').getNode();

      input.click = jest.fn();
      wrapper.simulate('click');
      expect(input.click).toBeCalled();
    });
  });
  describe('Snapshot', () => {
    test('matches snapshot', () => {
      const wrapper = createFilepicker();
      expect(wrapper.render()).toMatchSnapshot();
      wrapper.simulate('click');
      expect(wrapper.render()).toMatchSnapshot();
    });
  });
});
