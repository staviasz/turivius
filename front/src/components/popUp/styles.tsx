'use client';

import media from '@/styles/mediaQueries';
import { colors } from '@/styles/variables';
import styled from 'styled-components';
import { Header } from '../headers/styles';

export const Modal = styled.div`
  background-color: ${colors.tertiary};
  border-radius: 8px;
  padding: 24px;
  max-width: 550px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  box-shadow: 0px 0px 24px ${colors.shadow};

  ${media.mobile} {
    width: calc(100vw - 24px);
    padding: 24px 0;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colors.shadow};
  width: 100vw;
  min-height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;

  ${Header} {
    display: none;
  }

  ${media.mobile} {
    flex-direction: column;
    padding: 0;
  }
`;
