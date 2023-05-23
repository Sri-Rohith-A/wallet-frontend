import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RadioGroup from 'components/form-inputs/RadioGroup/RadioGroup';

describe('RadioGroup', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];
  const onChange = jest.fn();

  it('renders the label', () => {
    const { getByText } = render(<RadioGroup labelName='Test Label' options={options} />);
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('renders the radio options', () => {
    const { getByLabelText } = render(<RadioGroup options={options} />);
    expect(getByLabelText('Option 1')).toBeInTheDocument();
    expect(getByLabelText('Option 2')).toBeInTheDocument();
    expect(getByLabelText('Option 3')).toBeInTheDocument();
  });

  it('calls the onChange function when an option is selected', () => {
    const { getByLabelText } = render(
      <RadioGroup options={options} selectedOption='1' onChange={onChange} />,
    );
    fireEvent.click(getByLabelText('Option 2'));
    expect(onChange).toHaveBeenCalledWith('2');
  });
});
