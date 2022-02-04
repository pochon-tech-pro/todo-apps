import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from '../components/pages/Home';
import { MockedProvider } from '@apollo/client/testing';

test('renders learn react link', () => {
  render(
    <MockedProvider>
      <Home />
    </MockedProvider>
  );
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
