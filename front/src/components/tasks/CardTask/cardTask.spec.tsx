import { categories } from '@/mocks/categories';
import { tasks } from '@/mocks/task';
import { render, screen } from '@testing-library/react';
import CardTask from '.';

jest.mock('../../forms/fields/CustonCheckedBox');
jest.mock('next/image');

const task = tasks[0];

describe('<CardTask/>', () => {
  it('should render', () => {
    render(<CardTask task={task} />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(task.title);
  });

  it('should format description', () => {
    render(<CardTask task={task} />);
    const newDescription = task.description.slice(0, 70) + '...';
    const description = screen.getByText(newDescription);
    expect(description).toBeInTheDocument();
  });

  it('should render description', () => {
    task.description = 'description';
    render(<CardTask task={task} />);
    const description = screen.getByText(task.description);
    expect(description).toBeInTheDocument();
  });

  it('should render category', () => {
    render(<CardTask task={task} />);
    const category = screen.getByText(categories[task.category]);
    expect(category).toBeInTheDocument();
  });
});
