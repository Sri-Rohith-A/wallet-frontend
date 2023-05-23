import React from 'react';
import { render, screen } from '@testing-library/react';
import Filter from './Filter';

describe('Filter component', () => {
  const mockRegister = jest.fn();

  beforeEach(() => {
    render(<Filter type='text' name='filterName' value='filterValue' register={mockRegister} />);
  });

  it('renders the input element with correct attributes', () => {
    const inputElement = screen.getByRole('textbox', { name: 'filterValue' });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('name', 'filterName');
    expect(inputElement).toHaveAttribute('value', 'filterValue');
  });

  it('renders the Label component with correct props', () => {
    const labelElement = screen.getByText('filterValue');
    expect(labelElement).toBeInTheDocument();
  });
});
