'use client';

import { colors } from '@/styles/variables';
import styled from 'styled-components';

export const Container = styled.div`
  color: ${colors.primary};
  width: 200px;
  word-wrap: break-word;
`;

export const ContainerButton = styled.div`
  margin-top: 24px;
  display: grid;
  gap: 0px 32px;
  grid-template-columns: 1fr 1fr;
`;
