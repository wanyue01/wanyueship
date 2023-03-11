/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import Menu, { MenuProps } from ".";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
  onSelect: jest.fn(),
  className: 'test',
};
const testVerProps: MenuProps = {
  activeIndex: '0',
  mode: 'vertical',
};
const testMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        third
      </MenuItem>
      <li>error</li>
    </Menu>
  )
}

let menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem components', () => {
  beforeEach(() => {
    render(testMenu(testProps));
    menuElement = screen.getByTestId('test-menu');
    activeElement = screen.getByText('active');
    disabledElement = screen.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on the default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test');
    expect(menuElement.childNodes.length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item active');
    expect(disabledElement).toHaveClass('menu-item disabled');
  });
  it('click item should change active and call the right callback', () => {
    const thirdItem = screen.getByText('third');
    expect(thirdItem).toBeInTheDocument();
    fireEvent.click(thirdItem);
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    expect(thirdItem).toHaveClass('active');
    expect(activeElement).not.toHaveClass('active');
    fireEvent.click(disabledElement);
    expect(testProps.onSelect).not.toBeCalledWith('1');
    expect(disabledElement).not.toHaveClass('active');
  });
  it('should render vertical mode when the mode equal to vertical', () => {
    cleanup();
    render(testMenu(testVerProps));
    const element = screen.getByTestId('test-menu');
    expect(element).toHaveClass('menu-vertical');
  });
})