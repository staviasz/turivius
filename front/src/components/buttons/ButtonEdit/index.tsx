import editIcon from '@public/icons/edit.svg';
import Image from 'next/image';
import * as S from './styles';

export default function ButtonEdit(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <S.Button {...props}>
      <Image src={editIcon} alt="Icone de editar" />
    </S.Button>
  );
}
