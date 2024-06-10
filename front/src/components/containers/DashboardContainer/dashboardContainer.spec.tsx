import { tasks } from '@/mocks/task';
import { render, screen } from '@testing-library/react';
import DashboardContainer from '.';

jest.mock('../../forms/fields/CustonCheckedBox');
jest.mock('next/image');

describe('<DashboardContainer/>', () => {
  it('should render', () => {
    render(<DashboardContainer tasks={tasks} />);
    expect(screen.getByRole('heading', { name: 'Turivius' })).toBeInTheDocument();
  });

  it('should render select', () => {
    render(<DashboardContainer tasks={tasks} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render form', () => {
    render(<DashboardContainer tasks={tasks} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
