import React from 'react';
import { render } from '@testing-library/react';
import AppDetails from './AppDetails';

describe('AppDetails component', () => {
  test('renders app details', () => {
    const { getByText } = render(<AppDetails />);
    const versionLabelElement = getByText('Version');
    const versionNumberElement = getByText('1.0');
    const developersLabelElement = getByText('Developers');
    const developersListElement = getByText('Abdul Adhil');
    expect(versionLabelElement).toBeInTheDocument();
    expect(versionNumberElement).toBeInTheDocument();
    expect(developersLabelElement).toBeInTheDocument();
    expect(developersListElement).toBeInTheDocument();
  });
});
