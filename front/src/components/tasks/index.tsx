'use client';

import ContainerTask from '@/components/containers/ContainerTask';
import { useTask } from '@/hooks/useTask';
import { categories } from '@/mocks/categories';
import { type Task } from '@/types/task';
import addIcon from '@public/icons/addIcon.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as S from './styles';

export interface ITask {
  tasks: Task[];
}

export default function Task({ tasks }: ITask) {
  const { setFormIsOpen } = useTask();
  const [isTask, setIsTask] = useState<Task[]>([]);
  const [selected, setSelected] = useState('all tasks');

  useEffect(() => {
    if (selected === 'all tasks') {
      const tasksToDo = tasks.filter(task => task.completed === false);
      setIsTask(tasksToDo);
      return;
    }

    if (selected === 'completed') {
      const completedTasks = tasks.filter(task => task.completed === true);
      setIsTask(completedTasks);
      return;
    }

    const tasksForCategory = tasks.filter(
      task => categories[task.category] === selected && task.completed === false,
    );
    setIsTask(tasksForCategory);
  }, [selected, tasks]);

  return (
    <S.Container>
      <S.ContainerSelectAndButton>
        <S.Select onChange={e => setSelected(e.target.value)} value={selected}>
          <option value="all tasks">Todas as atividades</option>
          {Object.values(categories).map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          <option value="completed">Concluidas</option>
        </S.Select>
        <S.ButtonAddTask onClick={() => setFormIsOpen(true)}>
          <Image src={addIcon} alt="Adicionar atividade" />
        </S.ButtonAddTask>
      </S.ContainerSelectAndButton>
      {tasks.length ? (
        <ContainerTask tasks={isTask} />
      ) : (
        <S.NoTask>Você ainda não tem atividades para hoje.</S.NoTask>
      )}
    </S.Container>
  );
}
