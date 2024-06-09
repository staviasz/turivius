'use client';

import media from '@/styles/mediaQueries';
import { colors, fonts } from '@/styles/variables';
import styled from 'styled-components';

export const Container = styled.section`
  background-color: ${colors.primary};
  width: 100%;
`;

export const Select = styled.select`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.lightShadow};
  font-size: ${fonts.sizes.xxsmall};
  color: ${colors.primary};
  max-width: 250px;
  width: 100%;
  outline-color: ${colors.primary};
  cursor: pointer;

  ${media.tablet} {
    max-width: 200px;
  }

  ${media.mobile} {
    max-width: 100%;
  }
`;

export const ButtonAddTask = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: ${colors.success};
  cursor: pointer;
  transition: all 0.4s ease;
  > img {
    width: 1.5rem;
  }
  &:hover {
    background-color: ${colors.lightSuccess};
  }

  ${media.mobile} {
    display: none;
  }
`;

export const NoTask = styled.p`
  font-size: ${fonts.sizes.xxsmall};
  color: ${colors.darkgray};
`;

export const ContainerSelectAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;
