import React from 'react';
import * as S from './styles';

export type IButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
};

export default function ButtonDanger({ children, ...props }: IButton) {
  return <S.Button {...props}>{children}</S.Button>;
}
