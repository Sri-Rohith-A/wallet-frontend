import React from 'react';
import { render, screen } from '@testing-library/react';
import LabeledInput from './LabeledInput';

describe('LabeledInput componet ', () => {
  it('renders the input and label correctly', () => {
    const mockLabel = 'Email';
    const mockvalue = 'test@exxample.com';

    render(
      <LabeledInput
        type='text'
        name='Email'
        register={jest.fn()}
        errors={{}}
        disabled={false}
        labelColor='black'
        value={mockvalue}
      />,
    );
    const labelElement = screen.getByText(mockLabel);
    const inputElement = screen.getByDisplayValue(mockvalue);

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('input-box');
    expect(labelElement).toHaveClass('label black-color');
  });
});
