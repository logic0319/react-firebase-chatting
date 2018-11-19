import React from 'react';
import FileUploadModal from '../../components/Messages/FileUploadModal';
import {shallow} from 'enzyme/build';

describe('FileUploadModal', () => {
  let component = null;

  const isOpen = false;
  const mockCloseModal = jest.fn(e => e);
  const mockUploadFile = jest.fn(e => e);
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<FileUploadModal
      uploadFile={mockUploadFile}
      closeModal={mockCloseModal}
      isOpen={isOpen}
    />);
  });

  it('.jpg 파일은 true를 리턴해야 함', () => {
    const instance = component.instance()
    expect(instance.isAuthorized('6ff826f6ed144c29ab2ed42f310f4612_20181016181705.jpg')).toBe(true)
  });

  it('.svg 파일은 false 리턴해야 함', () => {
    const instance = component.instance()
    expect(instance.isAuthorized('img.svg')).toBe(false)
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });
});
