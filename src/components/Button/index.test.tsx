import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import Button, {ButtonProps} from ".";

const defaultProps = {
  onClick: jest.fn()
};

const testProps: ButtonProps = {
  btnType: 'primary',
  btnSize: 'lg',
  className: 'test-class'
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
};

// describe可以分组测试
describe('test Button Component', () => {
  it('shoule render the correct default button', () => {
    render(<Button {...defaultProps}>default</Button>);
    const element = screen.getByText('default') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeFalsy();
    // 模拟函数的调用
    fireEvent.click(element);
    // 测试函数是否被调用
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>different</Button>);
    const element = screen.getByText('different');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg test-class');
  });
  it('should render a link when btnType equals to link and href is provided', () => {
    render(<Button btnType='link' href='https://wanyue.site'>Link</Button>);
    const element = screen.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });
  it('should render disabled button when disabled set to be true', () => {
    render(<Button {...disabledProps}>disabled</Button>);
    const element = screen.getByText('disabled') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  })
})