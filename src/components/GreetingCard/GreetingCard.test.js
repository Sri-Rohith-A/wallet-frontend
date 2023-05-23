import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGlobalContext } from '../../hooks/useCookieContext/useCookieContext';
import GreetingCard from './GreetingCard';

jest.mock('../../hooks/useCookieContext/useCookieContext', () => ({
  useGlobalContext: jest.fn(),
}));

describe('GreetingCard', () => {
  it('renders the greeting message correctly with the username', () => {
    const mockUsername = 'John Doe';
    useGlobalContext.mockReturnValue({ username: mockUsername });

    render(<GreetingCard />);

    const greetingMessage = screen.getByText(`Hello ${mockUsername}`);
    const welcomeMessage = screen.getByText('Welcome to Sirius Wallet Admin Portal');
    const greetingWorkMessage = screen.getByText(
      'Manage Users, Vendors, Items and Create Reports instantly.',
    );

    expect(greetingMessage).toBeInTheDocument();
    expect(welcomeMessage).toBeInTheDocument();
    expect(greetingWorkMessage).toBeInTheDocument();
    expect(greetingMessage).toHaveClass('greeting-name');
  });
});
