import { tasks } from '@/mocks/task';
import ContainerTask from '.';

export default {
  title: 'ContainerTask',
  component: ContainerTask,
};

export const Template = () => {
  return (
    <div>
      <ContainerTask tasks={tasks} />
    </div>
  );
};
