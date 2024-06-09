import CardTask from '@/components/tasks/CardTask';
import type { Task } from '@/types/task';
import * as S from './styles';

export interface IContainerTask {
  tasks: Task[];
}

export default function ContainerTask({ tasks }: IContainerTask) {
  return (
    <S.Container>
      {tasks.map(task => (
        <li key={task.id}>
          <CardTask task={task} />
        </li>
      ))}
    </S.Container>
  );
}
