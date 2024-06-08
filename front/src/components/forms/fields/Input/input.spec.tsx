import { render, screen } from '@testing-library/react';
import Input from '.';

describe('<Input/>', () => {
  it('should render', () => {
    render(<Input id="input" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render label', () => {
    render(<Input id="input" label="label" />);
    expect(screen.getByText('label')).toBeInTheDocument();
  });
  it('should render children', () => {
    render(
      <Input id="input">
        <p>children</p>
      </Input>,
    );
    expect(screen.getByText('children')).toBeInTheDocument();
  });

  it('should render error message', () => {
    render(<Input id="input" errorMessage="error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
