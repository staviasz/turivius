'use client';

import ButtonEdit from '@/components/buttons/ButtonEdit';
import CustonCheckedBox from '@/components/forms/fields/CustonCheckedBox';
import { useTask } from '@/hooks/useTask';
import { categories } from '@/mocks/categories';
import type { Task } from '@/types/task';
import { useState } from 'react';
import * as S from './styles';

export interface ICardTask {
  task: Task;
}

export default function CardTask({ task }: ICardTask) {
  const { setFormIsOpen, setSelectedTask } = useTask();
  const { id, title, completed, category, description } = task;
  const [isChecked, setChecked] = useState<boolean>(completed);
  const descrptionFormated =
    description.length > 91 ? description.slice(0, 70) + '...' : description;

  const handleEditTask = () => {
    setSelectedTask(task);
    setFormIsOpen(true);
  };

  return (
    <S.Container checked={isChecked}>
      <S.Title>{title}</S.Title>
      <S.ContainerDescription>
        <p>{descrptionFormated}</p>
        <CustonCheckedBox
          checked={isChecked}
          id={id.toString()}
          onClick={() => setChecked(!isChecked)}
        />
      </S.ContainerDescription>
      <S.ContainerBtnIcon>
        <S.Button>{categories[category]}</S.Button>
        <ButtonEdit onClick={handleEditTask} />
      </S.ContainerBtnIcon>
    </S.Container>
  );
}
