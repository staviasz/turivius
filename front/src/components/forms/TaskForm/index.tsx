/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import ButtonDanger from '@/components/buttons/ButtonDanger';
import ButtonSecondary from '@/components/buttons/ButtonSecondary';
import Title from '@/components/Title';
import makeCreateTask from '@/factories/services/makeCreateTasks';
import makeDeleteTask from '@/factories/services/makeDeleteTasks';
import makeGetTask from '@/factories/services/makeGetTask';
import makeUpdateTask from '@/factories/services/makeUpdateTasks';
import { useTask } from '@/hooks/useTask';
import { categories } from '@/mocks/categories';
import type { Category } from '@/types/category';
import type { Task } from '@/types/task';
import { pastDate } from '@/utils/validators/pastDate';
import iconClose from '@public/icons/closeIcon.svg';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Input from '../fields/Input';
import * as S from './styles';

interface CustomFormEvent extends React.FormEvent {
  submitter: {
    name: string;
  };
}

export default function TaskForm() {
  const { data } = useSession();
  const token = data?.user.access_token;

  const { setFormIsOpen, setSelectedTask, selectedTask, setTasks } = useTask();
  const [selected, setSelected] = useState(categories[selectedTask?.category!] || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    mode: 'onChange',
    defaultValues: {
      ...selectedTask,
      executeDate: selectedTask?.execute_date
        ? (new Date(selectedTask?.execute_date).toISOString().split('T')[0] as unknown as Date)
        : undefined,
    },
  });

  const closeForm = () => {
    setFormIsOpen(false);
    setSelectedTask(null);
  };

  const submitHandler: SubmitHandler<Task> = async (data, event) => {
    data.category = Object.entries(categories).find(
      ([_, val]) => val === selected,
    )?.[0] as Category;
    data.execute_date = data.executeDate;
    const buttonSubmited = (event!.nativeEvent as CustomFormEvent).submitter.name;

    try {
      switch (buttonSubmited) {
        case 'saveTask':
          selectedTask
            ? await makeUpdateTask(data, selectedTask.id, token)
            : await makeCreateTask(data, token);
          break;
        case 'deleteTask':
          await makeDeleteTask(selectedTask!.id, token);
          break;
      }
      setFormIsOpen(false);
      const { body } = await makeGetTask(token);
      setTasks(body);
      setSelectedTask(null);
    } catch (error) {}
  };

  return (
    <S.RegisterForm onSubmit={handleSubmit(submitHandler)}>
      <S.ImageNext src={iconClose} alt="Fechar formulario" onClick={closeForm} />
      <Title>{selectedTask ? 'Editar Atividade' : 'Adicionar atividade'}</Title>
      <Input
        id="title"
        label="Titulo"
        placeholder="Titulo"
        hasError={!!errors.title}
        errorMessage={errors.title?.message}
        register={register('title', {
          required: 'O campo titulo é obrigatório',
          maxLength: {
            value: 30,
            message: 'O titulo deve ter no maximo 30 caracteres',
          },
          minLength: {
            value: 3,
            message: 'O titulo deve ter no minimo 3 caracteres',
          },
        })}
      />
      <S.ContainerDateAndSelected>
        <Input
          id="executeDate"
          label="Data de Execução"
          type="date"
          placeholder="Data de Execução"
          hasError={!!errors.executeDate}
          errorMessage={errors.executeDate?.message}
          register={register('executeDate', {
            required: 'O campo data é obrigatório',
            validate: value => pastDate(value!) || 'Coloque uma data futura',
          })}
        />
        <S.Select onChange={e => setSelected(e.target.value)} defaultValue={selected}>
          <option defaultValue="" disabled>
            Selecione uma opção
          </option>
          {Object.values(categories).map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </S.Select>
      </S.ContainerDateAndSelected>
      <Input
        id="description"
        as="textarea"
        label="Descricão"
        placeholder="Descricão"
        hasError={!!errors.description}
        errorMessage={errors.description?.message}
        register={register('description', {
          required: 'O campo descricão é obrigatório',
          maxLength: {
            value: 255,
            message: 'A descricão deve ter no maximo 255 caracteres',
          },
          minLength: {
            value: 3,
            message: 'A descricão deve ter no minimo 3 caracteres',
          },
        })}
      />
      <S.ContainerButtons>
        {selectedTask && <ButtonDanger name="deleteTask">Deletar</ButtonDanger>}
        <ButtonSecondary type="submit" name="saveTask">
          {!selectedTask ? 'Cadastrar' : 'Editar'}
        </ButtonSecondary>
      </S.ContainerButtons>
    </S.RegisterForm>
  );
}
