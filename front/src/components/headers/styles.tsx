'use client';

import media from '@/styles/mediaQueries';
import { colors } from '@/styles/variables';
import styled from 'styled-components';

export const Header = styled.header`
  background-color: ${colors.tertiary};
  padding: 16px;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ${media.mobile} {
    text-align: center;
  }
`;
