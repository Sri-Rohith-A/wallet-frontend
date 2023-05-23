import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Dropdown from 'components/Dropdown/Dropdown';

describe('Dropdown component', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const selected = 'Option 1';
  const setSelected = jest.fn();

  test('renders the correct initial selected option', () => {
    const { getByText } = render(
      <Dropdown options={options} selected={selected} setSelected={setSelected} />,
    );
    expect(getByText(selected)).toBeInTheDocument();
  });

  test('displays the dropdown options when clicked', () => {
    const { getByText, getByTestId } = render(
      <Dropdown options={options} selected={selected} setSelected={setSelected} />,
    );
    const dropdownButton = getByTestId('dropdown-btn');
    fireEvent.click(dropdownButton);
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();
  });

  test('calls setSelected function when an option is clicked', () => {
    const { getByTestId } = render(
      <Dropdown options={options} selected={selected} setSelected={setSelected} />,
    );
    const dropdownButton = getByTestId('dropdown-btn');
    fireEvent.click(dropdownButton);
    const option2 = getByTestId('dropdown-item-1');
    fireEvent.click(option2);
    expect(setSelected).toHaveBeenCalledTimes(1);
    expect(setSelected).toHaveBeenCalledWith('Option 2');
  });
});
