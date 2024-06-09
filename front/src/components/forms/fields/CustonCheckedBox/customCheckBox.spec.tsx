/* eslint-disable @next/next/no-img-element */
import { fireEvent, render, screen } from '@testing-library/react';
import CustomCheckBox from '.';

jest.mock('next/image');

describe('<CustomCheckBox/>', () => {
  it('should render', () => {
    render(<CustomCheckBox id="checkbox" defaultChecked={false} />);
    const checkbox = screen.getByLabelText('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should render checked', () => {
    render(<CustomCheckBox id="checkbox" defaultChecked title="input-checkbox" />);

    const checkbox = screen.getByTitle('input-checkbox');
    expect(checkbox).toHaveAttribute('checked');
  });

  it('should change checked', async () => {
    render(<CustomCheckBox id="checkbox" />);

    const checkbox = screen.getByLabelText('checkbox');
    const input = screen.getByLabelText('input-checkbox');

    expect(input).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(input).toBeChecked();
  });
});
