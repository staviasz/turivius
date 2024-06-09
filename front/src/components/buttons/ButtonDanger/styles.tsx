'use client';

import { colors, fonts } from '@/styles/variables';
import styled from 'styled-components';

export const Button = styled.button`
  color: ${colors.danger};
  background-color: transparent;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  font-weight: bold;
  text-align: center;
  font-size: ${fonts.sizes.xxxsmall};
  padding: 10px 16px;
  border: 1px solid ${colors.shadow};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.lightShadow};
  }
`;
