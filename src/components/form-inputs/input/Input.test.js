import React from 'react';
import { screen, render } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  it('renders the input component with correctly with correct proper props', () => {
    const type = 'text';
    const defaultValue = 'Input defaultValue';
    const value = 'Input Value';
    const name = 'inputname';
    render(
      <Input
        type={type}
        defaultValue={defaultValue}
        value={value}
        name={name}
        errors={{}}
        register={jest.fn()}
      />,
    );
    const inputElement = screen.getByDisplayValue(value);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('input-box');
  });
});
