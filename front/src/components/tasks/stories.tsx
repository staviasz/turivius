import { tasks } from '@/mocks/task';
import type { ITask } from '.';
import Tasks from '.';

export default {
  title: 'Tasks',
  component: Tasks,
  args: {
    tasks: tasks,
  },
};

export const Template = (args: ITask) => {
  return (
    <div>
      <Tasks {...args} />
    </div>
  );
};
