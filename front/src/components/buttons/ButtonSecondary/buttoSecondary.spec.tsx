import { render, screen } from '@testing-library/react';
import ButtonSecondary from '.';

describe('<ButtonSecondary/>', () => {
  it('should render', () => {
    render(<ButtonSecondary>Jest</ButtonSecondary>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Jest');
  });

  it('should render with href', () => {
    render(<ButtonSecondary href="http://localhost">Jest</ButtonSecondary>);
    const button = screen.getByRole('link');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', 'http://localhost');
  });
});
