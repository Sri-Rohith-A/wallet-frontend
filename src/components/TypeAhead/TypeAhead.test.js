import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TypeAhead from './TypeAhead';

describe('TypeAhead component', () => {
  const options = ['Apple', 'Banana', 'Cherry'];
  const query = 'Banana';
  const setQuery = jest.fn();

  it('renders TypeAhead component with correct props', () => {
    render(<TypeAhead options={options} query={query} setQuery={setQuery} />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(query);

    const dropdownElement = screen.getByTestId('dropdown');
    expect(dropdownElement).toBeInTheDocument();
    // expect(dropdownElement.children.length).toBe(options.length);
  });
  it('updates the query state on input change', () => {
    render(<TypeAhead options={options} query={query} setQuery={setQuery} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'New Query' } });
    expect(setQuery).toHaveBeenCalledTimes(1);
    expect(setQuery).toHaveBeenCalledWith('New Query');
  });
});
