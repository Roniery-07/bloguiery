import { render, screen } from '@testing-library/react';
import { Home } from './Home';

test('renders a button', () => {
  render(<Home />);

  expect(screen.getByText('Home')).toBeInTheDocument();
});
