import { render, screen } from '@testing-library/react';
import Title from '.';

describe('<Title/>', () => {
  it('should render', () => {
    render(<Title>Turivius</Title>);
    const logo = screen.getByRole('heading');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveTextContent('Turivius');
  });
});
