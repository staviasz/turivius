import * as S from './styles';

export interface ITitle {
  children: string;
}

export default function Title({ children }: ITitle) {
  return <S.Logo>{children}</S.Logo>;
}
