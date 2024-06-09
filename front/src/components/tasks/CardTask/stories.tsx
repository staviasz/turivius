import { tasks } from '@/mocks/task';
import type { ICardTask } from '.';
import CardTask from '.';

export default {
  title: 'CardTask',
  component: CardTask,
  args: {
    task: tasks[0],
  },
};

export const Template = (args: ICardTask) => {
  return (
    <div>
      <CardTask {...args} />
    </div>
  );
};
