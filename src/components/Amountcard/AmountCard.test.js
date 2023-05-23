import React from 'react';
import { render, screen } from '@testing-library/react';
import AmountCard from './AmountCard';

describe('AmountCard component', () => {
  const defaultProps = {
    label: 'this is label',
    amountSpent: '200',
    percent: 20,
    color: 'green',
    border: 'round',
  };

  it('renders amount card with default props', () => {
    render(<AmountCard {...defaultProps} />);

    const labelElement = screen.getByText(defaultProps.label);
    expect(labelElement).toBeInTheDocument();

    const percentElements = screen.queryAllByText((content, element) => {
      const hasText = (text) => element.textContent.includes(text);
      const elementHasPercentSign = hasText('%');
      const elementHasExpectedValue = hasText(defaultProps.percent.toString());
      return elementHasPercentSign && elementHasExpectedValue;
    });

    expect(percentElements.length).toBeGreaterThan(0);
  });
});
