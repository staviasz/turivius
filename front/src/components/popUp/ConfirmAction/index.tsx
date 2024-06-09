'use client';

import ButtonDanger from '@/components/buttons/ButtonDanger';
import ButtonSecondary from '@/components/buttons/ButtonSecondary';
import PopUp from '@/components/popUp';
import { useTask } from '@/hooks/useTask';
import * as S from './styles';

export interface IConfirmAction {
  children: string;
}

export default function ConfirmAction({ children }: IConfirmAction) {
  const { executeServiceTask, setActionForm, setFormIsOpen } = useTask();
  const handleClick = async (operation: 'yes' | 'not') => {
    switch (operation) {
      case 'yes':
        await executeServiceTask();
        setActionForm(null);
        setFormIsOpen(false);
        break;
      case 'not':
        setActionForm(null);

        break;
    }
  };

  return (
    <PopUp>
      <p>{children}</p>
      <S.ContainerButton>
        <ButtonSecondary onClick={() => handleClick('yes')}>Sim</ButtonSecondary>
        <ButtonDanger onClick={() => handleClick('not')}>Não</ButtonDanger>
      </S.ContainerButton>
    </PopUp>
  );
}
