'use client';

import { colors } from '@/styles/variables';
import styled from 'styled-components';

export const CustonCheckedBox = styled.label`
  > input {
    display: none;
  }

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 3px solid ${colors.primary};
    cursor: pointer;

    > img {
      display: none;
    }
  }

  > input:checked ~ span {
    > img {
      display: block;
    }
  }
`;
