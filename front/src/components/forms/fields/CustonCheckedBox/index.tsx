'use client';

import image from '@public/icons/check.svg';
import Image from 'next/image';
import { useState } from 'react';
import * as S from './styles';

export interface ICheckBox extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}
export default function CustonCheckedBox({ id, checked = false, ...props }: ICheckBox) {
  const [isChecked, setChecked] = useState(checked);

  return (
    <S.CustonCheckedBox htmlFor={`checkbox-${id}`}>
      <input
        aria-label="input-checkbox"
        id={`checkbox-${id}`}
        type="checkbox"
        checked={isChecked}
        {...props}
      />
      <span aria-label="checkbox" onClick={() => setChecked(!isChecked)}>
        {props.value || <Image src={image} alt="check marcado" />}
      </span>
    </S.CustonCheckedBox>
  );
}
