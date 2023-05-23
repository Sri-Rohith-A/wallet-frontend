import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from './Menu';
import { ProtectedRouteConstants } from '../../constants/route-constants';

describe('Menu', () => {
  it('should render the correct number of links', () => {
    const { container } = render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>,
    );
    const links = container.querySelectorAll('li');
    expect(links.length).toEqual(Object.keys(ProtectedRouteConstants).length);
  });

  it('should render the correct link text', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>,
    );
    Object.keys(ProtectedRouteConstants).forEach((route) => {
      expect(getByText(route.routeName)).toBeInTheDocument();
    });
  });

  it('should render the active link with the correct class', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Menu />
      </MemoryRouter>,
    );
    const activeLink = container.querySelector('.active-link');
    expect(activeLink).toBeInTheDocument();
  });
});
