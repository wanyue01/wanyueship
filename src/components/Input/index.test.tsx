import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Input, {InputProps} from '../Input';

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test default input',
}

describe('test Input Component', () => {
  it('should render the correct default Input', () => {
    render(<Input {...defaultProps} />);
    const element = screen.getByPlaceholderText('test default input') as HTMLInputElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('input-inner');
    fireEvent.change(element, {target: {value: 'val'}});
    expect(element.value).toEqual('val');
  });
  it('should render disabled input when the disabled property is set', () => {
    render(<Input disabled placeholder="disabled" />);
    const element = screen.getByPlaceholderText('disabled') as HTMLInputElement;
    expect(element.disabled).toBeTruthy();
  });
  it('should render different size when the size property is set', () => {
    render(<Input size="lg" placeholder="large" />);
    const element = screen.getByTestId('wrapper');
    expect(element).toHaveClass('input-size-lg');
  });
  it('should render prefix or suffix when the pre or suf property is set', () => {
    render(<Input pre='https://' suf='.com' placeholder="pre and suf" />);
    const inputWrapper = screen.getByTestId('wrapper');
    expect(inputWrapper).toHaveClass('input-group input-group-has-pre input-group-has-suf');
    expect(screen.getByText('https://')).toBeInTheDocument();
    expect(screen.getByText('.com')).toBeInTheDocument();
  })
})