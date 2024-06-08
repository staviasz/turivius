'use client';

import { colors } from '@/styles/variables';
import styled from 'styled-components';

export const LoginsForm = styled.form`
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.tertiary};
  padding: 16px;
  border-radius: 8px;
`;
