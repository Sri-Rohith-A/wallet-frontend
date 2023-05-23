import { render, screen, fireEvent } from '@testing-library/react';
import { OverlayModal } from './OverlayModal';

describe('OverlayModal', () => {
  const onCloseMock = jest.fn();

  it('renders the title and children', () => {
    const title = 'Test Title';
    const content = 'Test Content';
    render(
      <OverlayModal onClose={onCloseMock} title={title}>
        {content}
      </OverlayModal>,
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<OverlayModal onClose={onCloseMock} title='Test Title' />);
    fireEvent.click(screen.getByRole('button'));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
