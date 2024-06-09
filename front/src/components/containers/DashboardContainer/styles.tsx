'use client';

import { colors } from '@/styles/variables';
import styled from 'styled-components';

export const Main = styled.main`
  min-height: calc(100vh - 74px);
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${colors.primary};
  padding: 80px 24px;
`;
