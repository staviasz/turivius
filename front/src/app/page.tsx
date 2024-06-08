import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import Header from '@/components/headers';
import * as S from './styles';

export default function HomePage() {
  return (
    <>
      <Header />
      <S.Main className="container-main">
        <p>Organize suas tarefas e domine sua rotina </p>
        <S.ContainerButtons>
          <ButtonPrimary href="/login">Acessar conta</ButtonPrimary>
          <ButtonPrimary href="/register">Criar conta</ButtonPrimary>
        </S.ContainerButtons>
      </S.Main>
    </>
  );
}
