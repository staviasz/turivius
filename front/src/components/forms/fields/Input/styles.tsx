'use client';

import { colors, fonts } from '@/styles/variables';
import styled from 'styled-components';
import { ErrorMessage } from '../ErrorMessage/styles';

type InputProps = {
  $hasErro?: boolean;
  $as?: string;
};

export const Div = styled.div`
  min-height: 80px;
  width: 100%;
`;

export const InputContainer = styled.div<InputProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ $hasErro }) => ($hasErro ? colors.danger : colors.black)};

  ~ ${ErrorMessage} {
    margin-top: -24px;
  }
`;

export const Children = styled.div`
  position: absolute;
  top: 33%;
  right: 3%;
`;

export const BorderWhite = styled.span`
  position: relative;
  display: block;
  height: 1px;
  background-color: ${colors.white};
  top: 12px;
  left: -2px;
  width: 113%;
`;
export const Label = styled.label`
  position: relative;
  z-index: 1;
`;

export const LabelInput = styled.div`
  font-size: ${fonts.sizes.xxsmall};
  font-weight: normal;
  line-height: 24px;
  letter-spacing: 0.5px;
  position: absolute;
  top: 16px;
  left: 16px;
  pointer-events: none;
`;

export const InputStyle = styled.input<InputProps>`
  border: 1px solid ${({ $hasErro }) => ($hasErro ? colors.danger : colors.shadow)};
  border-radius: 8px;
  max-width: 100%;
  height: 56px;
  outline: none;
  padding-left: 16px;
  font-size: ${fonts.sizes.xxsmall};
  line-height: 24px;
  letter-spacing: 0.5px;
  resize: none;

  &:focus ~ ${LabelInput} {
    top: -15px;
    font-size: ${fonts.sizes.xxxsmall};
    background-color: transparent;
    padding: 0.2rem;
    transition: all 0.4s ease;
  }

  &::placeholder {
    color: transparent;
  }
  &:not(:placeholder-shown) ~ ${LabelInput} {
    top: -15px;
    font-size: 0.85rem;
    padding: 0.2rem;
  }
  &::-ms-reveal,
  ::-ms-clear {
    display: none;
  }
`;
