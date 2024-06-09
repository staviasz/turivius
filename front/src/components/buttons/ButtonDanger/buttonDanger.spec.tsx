import { render, screen } from '@testing-library/react';
import ButtonDanger from '.';

describe('<ButtonDanger/>', () => {
  it('should render', () => {
    render(<ButtonDanger>Children</ButtonDanger>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Children');
  });
});
