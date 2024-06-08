import { render, screen } from '@testing-library/react';
import ButtonPrimary from '.';

describe('<ButtonPrimary/>', () => {
  it('should render', () => {
    render(<ButtonPrimary>Jest</ButtonPrimary>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Jest');
  });

  it('should render with href', () => {
    render(<ButtonPrimary href="http://localhost">Jest</ButtonPrimary>);
    const button = screen.getByRole('link');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', 'http://localhost');
  });
});
