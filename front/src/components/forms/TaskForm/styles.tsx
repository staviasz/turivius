'use client';

import media from '@/styles/mediaQueries';
import { colors, fonts } from '@/styles/variables';
import Image from 'next/image';
import styled from 'styled-components';

export const RegisterForm = styled.form`
  position: relative;
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

  #description {
    height: 100px;
    padding: 8px;
  }
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
  height: 58px;

  ${media.tablet} {
    max-width: 200px;
  }

  ${media.mobile} {
    max-width: 100%;
  }
`;

export const ContainerDateAndSelected = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

export const ImageNext = styled(Image)`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;
