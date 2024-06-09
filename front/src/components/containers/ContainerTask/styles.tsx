'use client';

import media from '@/styles/mediaQueries';
import { colors } from '@/styles/variables';
import styled from 'styled-components';

export const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: ${colors.primary};
  column-gap: 16px;
  row-gap: 24px;
  padding: 0;
  align-content: center;

  li {
    list-style: none;
  }

  ${media.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;
