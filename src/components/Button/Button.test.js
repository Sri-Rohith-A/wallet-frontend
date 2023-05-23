import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  const defaultProps = {
    label: 'Click me',
    click: jest.fn(),
    color: 'blue',
    size: 'medium',
    border: 'none',
    icon: 'icon',
  };

  test('renders button with default props', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const button = getByText(defaultProps.label);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('blue');
    expect(button).toHaveClass('button-medium');
    expect(button).toHaveClass('border-none');
  });

  test('calls onClick handler when clicked', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const button = getByText(defaultProps.label);
    fireEvent.click(button);
    expect(defaultProps.click).toHaveBeenCalled();
  });
  test('renders label', () => {
    const { getByText } = render(<Button label='Click me' />);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  test('renders icon', () => {
    const { getByText } = render(<Button label='Click me' icon='icon' />);
    expect(getByText('icon')).toBeInTheDocument();
  });

  test('executes click handler', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button label='Click me' click={handleClick} />);
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies size prop as className suffix', () => {
    const { getByText } = render(<Button label='Click me' size='lg' />);
    expect(getByText('Click me')).toHaveClass('button-lg');
  });

  test('applies color prop as className suffix', () => {
    const { getByText } = render(<Button label='Click me' color='red' />);
    expect(getByText('Click me')).toHaveClass('red');
  });

  test('applies border prop as className suffix', () => {
    const { getByText } = render(<Button label='Click me' border='solid' />);
    expect(getByText('Click me')).toHaveClass('border-solid');
  });
});
