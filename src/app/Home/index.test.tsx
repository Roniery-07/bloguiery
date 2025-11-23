import { render, screen } from '@testing-library/react';
import { Home } from './index';

test('renders a button', () => {
  render(<Home />);

  expect(screen.getByText('Home')).toBeInTheDocument();
});
