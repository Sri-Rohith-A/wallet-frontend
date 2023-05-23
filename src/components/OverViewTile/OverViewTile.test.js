import { render, screen } from '@testing-library/react';
import OverViewTile from './OverViewTile';

describe('OverViewTile component', () => {
  const mockProps = {
    timeInterval: 'Today',
    ammountSpent: 7450,
    handleActiveCard: jest.fn(),
    cardIndex: 0,
    activeCard: 0,
  };

  it('should render the component with the provided props', () => {
    render(<OverViewTile {...mockProps} />);
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('₹ 7,450')).toBeInTheDocument();
  });

  it('should call the "handleActiveCard" function when clicked', () => {
    const { container } = render(<OverViewTile {...mockProps} />);
    const card = container.firstChild;

    card.click();
    expect(mockProps.handleActiveCard).toHaveBeenCalled();
  });

  it('adds active class when index matches selected prop', () => {
    const { container } = render(<OverViewTile {...mockProps} />);
    expect(container.firstChild).toHaveClass('active');
  });

  it('does not add active class when index does not match selected prop', () => {
    const { container } = render(<OverViewTile {...mockProps} cardIndex={1} activeCard={0} />);
    expect(container.firstChild).not.toHaveClass('active');
  });
});
