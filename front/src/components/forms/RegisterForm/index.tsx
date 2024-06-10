'use client';

import ButtonSecondary from '@/components/buttons/ButtonSecondary';
import Title from '@/components/Title';
import makeRegister from '@/factories/services/makeRegister';
import type { ErrorApi } from '@/services/errors/errorApi';
import type { ISignUp } from '@/types/signUp';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../fields/ErrorMessage';
import Input from '../fields/Input';
import * as S from './styles';

export default function RegisterForm() {
  const router = useRouter();
  const [errorApi, setErrorApi] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    mode: 'onChange',
  });

  const submitHandler: SubmitHandler<ISignUp> = async (data: ISignUp) => {
    try {
      await makeRegister(data);
      router.push('/login');
    } catch (error) {
      const _error = error as ErrorApi;
      setErrorApi(_error.body?.message);
    }
  };

  return (
    <S.RegisterForm onSubmit={handleSubmit(submitHandler)}>
      <Title>Crie sua conta</Title>
      <Input
        id="name"
        label="Nome"
        placeholder="nome"
        hasError={!!errors.first_name}
        errorMessage={errors.first_name?.message}
        register={register('first_name', {
          required: 'O campo nome é obrigatório',
          pattern: {
            value: /^[a-zA-ZÀ-ÿ\s]+$/,
            message: 'O nome não pode conter números ou caracteres especiais',
          },
        })}
      />
      <Input
        id="email"
        label="E-mail"
        placeholder="E-mail"
        hasError={!!errors.email}
        errorMessage={errors.email?.message}
        register={register('email', {
          required: 'O campo email é obrigatório',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'preencha um e-mail válido',
          },
        })}
      />
      <Input
        id="password"
        label="Senha"
        placeholder="Senha"
        hasError={!!errors.password}
        errorMessage={errors.password?.message}
        register={register('password', {
          required: 'O campo senha é obrigatório',
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*=])[a-zA-Z\d!@#$%&*=]{6,}$/,
            message:
              'A senha deve ter o mínimo de 6 caracteres e conter letras maiúsculas e minúsculas, números e símbolos como ! @ # $ % & * =',
          },
        })}
      />
      {errorApi && <ErrorMessage>{errorApi}</ErrorMessage>}
      <ButtonSecondary type="submit">Cadastrar</ButtonSecondary>
    </S.RegisterForm>
  );
}
