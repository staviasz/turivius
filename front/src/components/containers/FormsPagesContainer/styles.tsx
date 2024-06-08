'use client';

import { colors } from '@/styles/variables';
import styled from 'styled-components';

export const Main = styled.main`
  min-height: calc(100vh - 74px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
`;
