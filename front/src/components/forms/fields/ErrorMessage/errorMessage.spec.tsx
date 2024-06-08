import { render, screen } from '@testing-library/react';
import ErrorMessage from '.';

describe('<ErrorMessage/>', () => {
  it('should render', () => {
    render(<ErrorMessage>Children</ErrorMessage>);
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
