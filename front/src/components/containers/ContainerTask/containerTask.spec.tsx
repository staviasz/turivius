import { tasks } from '@/mocks/task';
import { render, screen } from '@testing-library/react';
import ContainerTask from '.';

jest.mock('../../forms/fields/CustonCheckedBox');
jest.mock('next/image');

describe('<ContainerTask/>', () => {
  it('should render', () => {
    render(<ContainerTask tasks={tasks} />);
    const list = screen.getAllByRole('listitem');
    expect(list.length).toEqual(tasks.length);
  });
});
