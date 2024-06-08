'use client';

import media from '@/styles/mediaQueries';
import { colors, fonts } from '@/styles/variables';
import styled from 'styled-components';

export const Logo = styled.h1`
  font-size: ${fonts.sizes.xlarge};
  color: ${colors.primary};
  font-style: italic;

  ${media.mobile} {
    font-size: ${fonts.sizes.medium};
  }
`;
