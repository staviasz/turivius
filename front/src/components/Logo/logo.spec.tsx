import { render, screen } from '@testing-library/react';
import Logo from '.';

describe('<Logo/>', () => {
  it('should render', () => {
    render(<Logo />);
    const logo = screen.getByRole('heading');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveTextContent('Turivius');
  });
});
