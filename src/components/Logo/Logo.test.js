import React from 'react';
import { render } from '@testing-library/react';
import Logo from './Logo';

describe('Logo component', () => {
  const props = {
    src: 'test-image.png',
    alt: 'test-logo',
  };

  it('should render the component with props', () => {
    const { getByAltText } = render(<Logo {...props} />);
    const logoImg = getByAltText('test-logo');
    expect(logoImg).toBeInTheDocument();
  });

  it('should render the logo text with highlighted text', () => {
    const { getByText } = render(<Logo {...props} />);
    const normalText = getByText('WALL');
    const highlightedText = getByText('ET');
    expect(normalText).toBeInTheDocument();
    expect(highlightedText).toBeInTheDocument();
  });
});
