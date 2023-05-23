import { render } from '@testing-library/react';
import Title from './Title';

describe('Title', () => {
  it('renders the title text', () => {
    const title = 'WELCOME TO MY WEBSITE';
    const { getByText } = render(<Title title={title} />);
    expect(getByText(title)).toBeInTheDocument();
  });

  it('renders the heading with the correct style class', () => {
    const title = 'Welcome to my website';
    const { getByRole } = render(<Title title={title} />);
    const heading = getByRole('heading');
    expect(heading).toHaveClass('heading');
  });
});
