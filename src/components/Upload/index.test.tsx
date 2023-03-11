/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, RenderResult, fireEvent, waitFor, screen } from '@testing-library/react'
import Upload, { UploadProps } from '.';
// import axios from 'axios';

jest.mock('../Icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  };
});

jest.mock('axios', () => {
  return {
    post: () => Promise.resolve({ 'data': 'success' })
  };
});
// const mockedAxios = axios as jest.Mocked<typeof axios>;
// jest.mock('axios')
// const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fakeurl.com',
  drag: true,
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
};

let view: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(['xyz'], 'avatar.png', { type: 'image/png' });
describe('test Upload component', () => {
  beforeEach(() => {
    view = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = view.container.querySelector('input') as HTMLInputElement;
    uploadArea = screen.getByText('Click to upload');
  });
  it('should upload successfully', async () => {
    // mockedAxios.post.mockResolvedValue({'data': 'success'});
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    expect(screen.getByText('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('avatar.png')).toBeInTheDocument();
      expect(screen.getByText('check-circle')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toBeCalledWith({ 'data': 'success' }, expect.objectContaining({
      raw: testFile,
      status: 'success',
      success: { 'data': 'success' },
      name: 'avatar.png'
    }));
    expect(testProps.onChange).toBeCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      success: { 'data': 'success' },
      name: 'avatar.png'
    }));

    // remove the upload file
    expect(screen.getByText('times')).toBeInTheDocument();
    fireEvent.click(screen.getByText('times'));
    expect(screen.queryByText('avatar.png')).not.toBeInTheDocument();
    expect(testProps.onRemove).toBeCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      success: { 'data': 'success' },
      name: 'avatar.png'
    }));
  });
  it('drag and drop files should work fine', async () => {
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('is-dragover');
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('is-dragover');
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile]
      }
    });
    await waitFor(() => {
      expect(screen.getByText('avatar.png')).toBeInTheDocument();
      expect(screen.getByText('check-circle')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toBeCalledWith({ 'data': 'success' }, expect.objectContaining({
      raw: testFile,
      status: 'success',
      success: { 'data': 'success' },
      name: 'avatar.png'
    }));
  })
});