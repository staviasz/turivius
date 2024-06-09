import { categories } from '@/mocks/categories';
import { tasks } from '@/mocks/task';
import { render, screen } from '@testing-library/react';
import Task from '.';

jest.mock('next/image');
jest.mock('../forms/fields/CustonCheckedBox');

describe('<Task/>', () => {
  it('should render', () => {
    render(<Task tasks={tasks} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    const list = screen.getAllByRole('listitem');
    const tasksNonCompleted = tasks.filter(task => !task.completed);
    expect(list.length).toEqual(tasksNonCompleted.length);
  });

  it('should render correct options in select', () => {
    render(<Task tasks={tasks} />);
    expect(screen.getByRole('option', { name: 'Todas as atividades' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Concluidas' })).toBeInTheDocument();

    for (const category of Object.values(categories)) {
      expect(screen.getByRole('option', { name: category })).toBeInTheDocument();
    }
  });
});
