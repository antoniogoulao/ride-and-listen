import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing page on load', () => {
  render(<App />);
  expect(screen.getByText('Ride & Listen')).toBeInTheDocument();
});