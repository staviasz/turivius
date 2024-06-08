import { render, screen } from '@testing-library/react';
import Header from '.';

describe('<Header/>', () => {
  it('should render', () => {
    render(<Header />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Turivius');
  });
});
