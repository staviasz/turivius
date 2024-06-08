import Header from '@/components/headers';
import * as S from './styles';

export interface IFormsPagesContainer {
  children: React.ReactNode;
}

export default function FormsPagesContainer({ children }: IFormsPagesContainer) {
  return (
    <>
      <Header />
      <S.Main>{children}</S.Main>
    </>
  );
}
