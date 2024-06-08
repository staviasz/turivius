'use client';

import media from '@/styles/mediaQueries';
import { colors, fonts } from '@/styles/variables';
import styled from 'styled-components';

export const Header = styled.header`
  background-color: ${colors.tertiary};
  padding: 16px;

  ${media.mobile} {
    text-align: center;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 162px 16px;

  > p {
    font-size: ${fonts.sizes.xlarge};
    margin-bottom: 60px;
    text-align: center;

    ${media.tablet} {
      font-size: ${fonts.sizes.medium};
    }
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  gap: 24px;

  ${media.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;
