'use client';

import ButtonSecondary from '@/components/buttons/ButtonSecondary';
import Title from '@/components/Title';
import { categories } from '@/mocks/categories';
import type { Task } from '@/types/task';
import { pastDate } from '@/utils/validators/pastDate';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../fields/Input';
import * as S from './styles';

export default function TaskForm() {
  const [selected, setSelected] = useState('all tasks');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    mode: 'onChange',
  });

  const submitHandler = (data: Task) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <S.RegisterForm onSubmit={handleSubmit(submitHandler)}>
      <Title>Adicionar atividade</Title>
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
        <S.Select onChange={e => setSelected(e.target.value)} value={selected}>
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
      <ButtonSecondary type="submit">Cadastrar</ButtonSecondary>
    </S.RegisterForm>
  );
}
