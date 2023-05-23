import { render, screen } from '@testing-library/react';
import EventCard from 'components/EventCard/EventCard';

describe('EventCard', () => {
  const props = {
    eventName: 'Test Event',
    eventStatus: 'Upcoming',
    startDate: new Date('2023-05-10'),
    endDate: new Date('2023-05-12'),
  };

  test('renders event name', () => {
    render(<EventCard {...props} />);
    const eventNameElement = screen.getByText(props.eventName);
    expect(eventNameElement).toBeInTheDocument();
  });

  test('renders event date', () => {
    render(<EventCard {...props} />);
    const eventDateElement = screen.getByTestId('event date');
    expect(eventDateElement).toBeInTheDocument();
  });
});
