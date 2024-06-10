'use client';

import ButtonEdit from '@/components/buttons/ButtonEdit';
import CustonCheckedBox from '@/components/forms/fields/CustonCheckedBox';
import makeGetTask from '@/factories/services/makeGetTask';
import makeUpdateTask from '@/factories/services/makeUpdateTasks';
import { useTask } from '@/hooks/useTask';
import { categories } from '@/mocks/categories';
import type { Task } from '@/types/task';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import * as S from './styles';

export interface ICardTask {
  task: Task;
}

export default function CardTask({ task }: ICardTask) {
  const { setFormIsOpen, setSelectedTask, setTasks } = useTask();
  const { data } = useSession();
  const { id, title, completed, category, description } = task;
  const [isChecked, setChecked] = useState<boolean>(completed);

  const descrptionFormated =
    description.length > 91 ? description.slice(0, 70) + '...' : description;

  const clickCheck = async () => {
    const token = data?.user?.access_token;
    await makeUpdateTask({ ...task, completed: !task.completed }, task.id, token);
    const { body } = await makeGetTask(token);
    setTasks(body);
    setChecked(!isChecked);
  };

  const handleEditTask = () => {
    setSelectedTask(task);
    setFormIsOpen(true);
  };

  return (
    <S.Container checked={isChecked}>
      <S.Title>{title}</S.Title>
      <S.ContainerDescription>
        <p>{descrptionFormated}</p>
        <CustonCheckedBox checked={isChecked} id={id.toString()} onClick={clickCheck} />
      </S.ContainerDescription>
      <S.ContainerBtnIcon>
        <S.Button>{categories[category]}</S.Button>
        <ButtonEdit onClick={handleEditTask} />
      </S.ContainerBtnIcon>
    </S.Container>
  );
}
