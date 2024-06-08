'use client';

import { colors, fonts } from '@/styles/variables';
import styled from 'styled-components';

export const ErrorMessage = styled.span`
  color: ${colors.danger};
  font-size: ${fonts.sizes.xxxsmall};
  max-width: 368px;
  text-align: justify;
`;
