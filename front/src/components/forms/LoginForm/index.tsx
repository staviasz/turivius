'use client';

import ButtonSecondary from '@/components/buttons/ButtonSecondary';
import Title from '@/components/Title';
import type { ILogin } from '@/types/login';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../fields/ErrorMessage';
import Input from '../fields/Input';
import * as S from './styles';

export default function LoginForm() {
  const router = useRouter();
  const [errorsApi, setErrosApi] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: 'onChange',
  });

  const submitHandler: SubmitHandler<ILogin> = async (data: ILogin) => {
    const response = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (!response?.ok) {
      setErrosApi('credenciais inválidas');
      return;
    }
    router.replace('/dashboard');
  };

  return (
    <S.LoginsForm onSubmit={handleSubmit(submitHandler)}>
      <Title>Login</Title>
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
        type="password"
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
      {errorsApi && <ErrorMessage>{errorsApi}</ErrorMessage>}
      <ButtonSecondary>Entrar</ButtonSecondary>
    </S.LoginsForm>
  );
}
