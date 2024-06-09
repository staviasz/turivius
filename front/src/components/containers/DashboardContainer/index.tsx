'use client';

import TaskForm from '@/components/forms/TaskForm';
import Header from '@/components/headers';
import PopUp from '@/components/popUp';
import Task from '@/components/tasks';
import { useTask } from '@/hooks/useTask';
import type { Task as ITask } from '@/types/task';
import * as S from './styles';

export interface IDashboardContainer {
  tasks: ITask[];
}

export default function DashboardContainer({ tasks }: IDashboardContainer) {
  const { formIsOpen } = useTask();

  return (
    <>
      {formIsOpen && (
        <PopUp>
          <TaskForm />
        </PopUp>
      )}
      <Header />
      <S.Main className="container-main">
        <Task tasks={tasks} />
      </S.Main>
    </>
  );
}
