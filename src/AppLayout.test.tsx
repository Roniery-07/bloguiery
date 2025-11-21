import { render, screen } from '@testing-library/react';
import App from './AppLayout';

test('renders a button', () => {
  render(<App />);

  expect(screen.getByText('ola')).toBeInTheDocument();
});
