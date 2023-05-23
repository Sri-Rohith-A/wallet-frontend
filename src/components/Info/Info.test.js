import { render, screen } from '@testing-library/react';
import Info from 'components/Info/Info';

describe('Info component', () => {
  test('renders the message passed to it', () => {
    const message = 'This is an information message';
    render(<Info message={message} />);
    const infoMessage = screen.getByText(message);
    expect(infoMessage).toBeInTheDocument();
  });
});
