import React from 'react';
import * as S from './styles';

interface IPopUpProps {
  children: React.ReactNode;
}

export default function PopUp({ children }: IPopUpProps) {
  return (
    <S.Container>
      <S.Modal>{children}</S.Modal>
    </S.Container>
  );
}
