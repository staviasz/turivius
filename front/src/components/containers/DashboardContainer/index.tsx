'use client';

import TaskForm from '@/components/forms/TaskForm';
import Header from '@/components/headers';
import PopUp from '@/components/popUp';
import ConfirmAction from '@/components/popUp/ConfirmAction';
import Task from '@/components/tasks';
import makeGetTask from '@/factories/services/makeGetTask';
import { useTask } from '@/hooks/useTask';
import type { Task as ITask } from '@/types/task';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import * as S from './styles';

export interface IDashboardContainer {
  tasks: ITask[];
}

export default function DashboardContainer() {
  const { formIsOpen, selectedActionForm, setTasks } = useTask();
  const { data } = useSession();

  useEffect(() => {
    (async () => {
      const { body } = await makeGetTask(data?.user?.access_token);
      setTasks(body);
    })();
  }, [data?.user?.access_token, setTasks]);

  return (
    <>
      {formIsOpen && (
        <PopUp>
          <TaskForm />
        </PopUp>
      )}
      {selectedActionForm && <ConfirmAction>Tem certeza que deseja continuar</ConfirmAction>}
      <Header />
      <S.Main className="container-main">
        <Task />
      </S.Main>
    </>
  );
}
