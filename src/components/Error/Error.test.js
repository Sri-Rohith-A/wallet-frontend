import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error component', () => {
  const errors = {
    name: {
      type: 'required',
      message: 'Name is required',
    },
  };

  it('renders error bar and message when error is present', () => {
    render(<Error name='name' errors={errors} />);
    const ErrorBarElement = screen.getByText(errors.name.message);
    expect(ErrorBarElement).toBeInTheDocument();
  });
});
