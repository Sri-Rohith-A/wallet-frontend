import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationBox from './ConfirmationBox';

describe('ConfirmationBox component', () => {
  const defaultProps = {
    title: 'Confirmation',
    desc: 'Are you sure?',
    close: jest.fn(),
    click: jest.fn(),
  };

  it('renders ConfirmationBox with correct props', () => {
    render(<ConfirmationBox {...defaultProps} />);

    const titleElement = screen.getByText(defaultProps.title);
    expect(titleElement).toBeInTheDocument();

    const descElement = screen.getByText(defaultProps.desc);
    expect(descElement).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'No' });
    expect(closeButton).toBeInTheDocument();

    const confirmButton = screen.getByRole('button', { name: 'Yes' });
    expect(confirmButton).toBeInTheDocument();
  });

  it('calls the close and click functions when buttons are clicked', () => {
    render(<ConfirmationBox {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: 'No' });
    fireEvent.click(closeButton);
    expect(defaultProps.close).toHaveBeenCalledTimes(1);

    const confirmButtons = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(confirmButtons);
    expect(defaultProps.click).toHaveBeenCalledTimes(1);
  });
});
