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
  const { setExecuteServiceTask, setActionForm, setFormIsOpen } = useTask();
  const handleClick = async (operation: 'yes' | 'not') => {
    console.log(operation);
    try {
      switch (operation) {
        case 'yes':
          setExecuteServiceTask(true);
          setFormIsOpen(false);
          setActionForm(null);
          // setExecuteServiceTask(false);
          break;
        case 'not':
          setActionForm(null);

          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PopUp>
      <S.Container>
        <p>{children}</p>
        <S.ContainerButton>
          <ButtonSecondary onClick={() => handleClick('yes')}>Sim</ButtonSecondary>
          <ButtonDanger onClick={() => handleClick('not')}>Não</ButtonDanger>
        </S.ContainerButton>
      </S.Container>
    </PopUp>
  );
}
