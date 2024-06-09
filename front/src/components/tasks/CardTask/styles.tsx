'use client';

import media from '@/styles/mediaQueries';
import { colors, fonts } from '@/styles/variables';
import styled from 'styled-components';

interface ICardTaskStyles {
  checked: boolean;
}

export const Title = styled.h2`
  font-size: ${fonts.sizes.xsmall};
  line-height: 20px;
  font-weight: bold;

  > i {
    font-size: ${fonts.sizes.xxxsmall};
    margin-right: 5px;
  }
`;

export const ContainerDescription = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  min-height: 90px;
  column-gap: 8px;

  &:last-child {
  }

  > p {
    max-width: 100%;
    word-break: break-all;
    color: ${colors.primary};
  }

  > label {
    > span {
      position: relative;
      z-index: 11;
      right: 0;
    }
  }
`;

export const Container = styled.div<ICardTaskStyles>`
  max-width: 400px;
  background-color: ${colors.tertiary};
  border-radius: 8px;
  padding: 8px;
  position: relative;
  z-index: 1;
  border: 1px solid ${colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${Title} {
    color: ${colors.primary};
  }

  ${ContainerDescription} {
    > p {
      text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
    }
  }

  ${media.mobile} {
    max-width: 100%;
  }
`;

export const ContainerBtnIcon = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 4px 8px;
  background-color: ${colors.darkBlue};
  border-radius: 8px;
  border: none;
  font-size: 14px;
  color: ${colors.white};
`;
