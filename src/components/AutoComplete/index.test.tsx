/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { config } from 'react-transition-group';
import { render, screen, RenderResult, fireEvent, waitFor, cleanup } from '@testing-library/react';
import AutoComplete, { AutoCompleteProps, DataSourceType } from '.';

config.disabled = true;

const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 12 },
  { value: 'b', number: 13 },
  { value: 'c', number: 14 },
];
const testProps: AutoCompleteProps = {
  fetchSuggestions(query) { return testArray.filter(item => item.value.includes(query)) },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
};
const renderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{ value: string; number: number }>;
  return (
    <>
      <h1>name: {itemWithNumber.value}</h1>
      number: {itemWithNumber.number}
    </>
  );
};
const testPropsWithCustomRender: AutoCompleteProps = {
  ...testProps,
  placeholder: 'auto-complete',
  renderOption
};

let inputNode: HTMLInputElement;
let view: RenderResult;
describe('test AutoComplete component', () => {
  beforeEach(() => {
    view = render(<AutoComplete {...testProps} />);
    inputNode = screen.getByPlaceholderText('auto-complete');
  });
  it('should have basic AutoComplete behavior', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument();
    });
    expect(view.container.querySelectorAll('.suggestions-item').length).toEqual(2);
    fireEvent.click(screen.getByText('ab'));
    expect(testProps.onSelect).toBeCalledWith({ value: 'ab', number: 11 });
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
    expect(inputNode.value).toEqual('ab');
  });
  it('should provide keyboard support', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument();
    });
    const firstResult = screen.queryByText('ab');
    const secondResult = screen.queryByText('abc');

    fireEvent.keyDown(inputNode, { key: 'ArrowDown' });
    expect(firstResult).toHaveClass('item-highlight');
    fireEvent.keyDown(inputNode, { key: 'ArrowDown' });
    expect(secondResult).toHaveClass('item-highlight');
    fireEvent.keyDown(inputNode, { key: 'ArrowUp' });
    expect(firstResult).toHaveClass('item-highlight');
    fireEvent.keyDown(inputNode, { key: 'Enter' });
    expect(testProps.onSelect).toBeCalledWith({ value: 'ab', number: 11 });
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
    expect(inputNode.value).toEqual('ab');
  });
  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, { target: { value: 'ab' } });
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
  });
  it('renderOption should generate the right template', async () => {
    cleanup();
    render(<AutoComplete {...testPropsWithCustomRender} />);
    inputNode = screen.getByPlaceholderText('auto-complete');
    fireEvent.change(inputNode, {target: {value: 'ab'}});
    await waitFor(() => {
      expect(screen.getByText('name: ab')).toBeInTheDocument();
    });
  });
  it('async fetchSuggestions should work fine', async () => {
    cleanup();
    const testPropsWithPromise = {
      ...testProps,
      fetchSuggestions: jest.fn(query => Promise.resolve(testArray.filter(item => item.value.includes(query))))
    };
    render(<AutoComplete {...testPropsWithPromise} />);
    // render(<AutoComplete {...testPropsWithCustomRender} />);
    inputNode = screen.getByPlaceholderText('auto-complete');
    fireEvent.change(inputNode, {target: {value: 'a'}});
    await waitFor(() => {
      expect(testPropsWithPromise.fetchSuggestions).toBeCalled();
      expect(screen.getByText('ab')).toBeInTheDocument();
    });
  });
})