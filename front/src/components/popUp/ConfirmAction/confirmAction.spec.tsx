import { useTask } from '@/hooks/useTask';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ConfirmAction from '.';

jest.mock('../../../hooks/useTask');

const mockedUseTask = useTask as jest.MockedFunction<typeof useTask>;
mockedUseTask.mockReturnValue({
  executeServiceTask: jest.fn(),
  setActionForm: jest.fn(),
  setFormIsOpen: jest.fn(),
  formIsOpen: false,
  selectedActionForm: null,
  selectedTask: null,
  selectedTypeTask: null,
  setSelectedTask: jest.fn(),
  setSelectedTypeTask: jest.fn(),
  setTasks: jest.fn(),
  tasks: [],
});

describe('<ConfirmAction/>', () => {
  it('should render', () => {
    render(<ConfirmAction>Children</ConfirmAction>);
    const heading = screen.getByText('Children');
    expect(heading).toBeInTheDocument();
  });

  it('should render button', () => {
    render(<ConfirmAction>Children</ConfirmAction>);
    const button = screen.getAllByRole('button');
    expect(button.length).toBe(2);
  });

  it('should not execute action', async () => {
    render(<ConfirmAction>Children</ConfirmAction>);
    const button = screen.getByRole('button', { name: 'Não' });
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockedUseTask().setActionForm).toHaveBeenCalledWith(null);
    });
  });

  it('should execute action', async () => {
    render(<ConfirmAction>Children</ConfirmAction>);
    const button = screen.getByRole('button', { name: 'Sim' });
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockedUseTask().executeServiceTask).toHaveBeenCalledTimes(1);
      expect(mockedUseTask().setActionForm).toHaveBeenCalledWith(null);
      expect(mockedUseTask().setFormIsOpen).toHaveBeenCalledWith(false);
    });
  });
});
