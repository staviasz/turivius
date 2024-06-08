import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import Logo from '@/components/Logo';
import * as S from './styles';

export default function HomePage() {
  return (
    <>
      <S.Header>
        <div className="container-main">
          <Logo />
        </div>
      </S.Header>

      <S.Main className="container-main">
        <p>Organize suas tarefas e domine sua rotina </p>
        <S.ContainerButtons>
          <ButtonPrimary href="/">Acessar conta</ButtonPrimary>
          <ButtonPrimary href="/">Criar conta</ButtonPrimary>
        </S.ContainerButtons>
      </S.Main>
    </>
  );
}
