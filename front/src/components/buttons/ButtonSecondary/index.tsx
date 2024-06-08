import * as S from './styles';

export interface IButtonSecondary extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

export default function ButtonSecondary({ href, ...props }: IButtonSecondary) {
  return href ? (
    <S.LinkNext href={href}>
      <S.ButtonSecondary {...props}>{props.children}</S.ButtonSecondary>
    </S.LinkNext>
  ) : (
    <S.ButtonSecondary {...props}>{props.children}</S.ButtonSecondary>
  );
}
