import React from 'react';
import { screen, render } from '@testing-library/react';
import { Label } from './Label';

describe('Label component', () => {
  it('renders the label component correctly with the label text', () => {
    const color = 'black';
    const name = 'label';
    const labelText = 'i am label text';
    render(<Label color={color} name={name} labelText={labelText} />);

    const labelElement = screen.getByText(labelText);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('label');
    expect(labelElement).toHaveClass('black-color');
  });
});
