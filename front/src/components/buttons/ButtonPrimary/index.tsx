import * as S from './styles';

export interface IButtonPrimary extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

export default function ButtonPrimary({ href, ...props }: IButtonPrimary) {
  return href ? (
    <S.LinkNext href={href}>
      <S.ButtonPrimary {...props}>{props.children}</S.ButtonPrimary>
    </S.LinkNext>
  ) : (
    <S.ButtonPrimary {...props}>{props.children}</S.ButtonPrimary>
  );
}
