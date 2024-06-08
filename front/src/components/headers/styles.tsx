'use client';

import media from '@/styles/mediaQueries';
import { colors } from '@/styles/variables';
import styled from 'styled-components';

export const Header = styled.header`
  background-color: ${colors.tertiary};
  padding: 16px;

  ${media.mobile} {
    text-align: center;
  }
`;
