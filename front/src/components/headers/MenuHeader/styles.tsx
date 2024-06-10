'use client';

import media from '@/styles/mediaQueries';
import { colors, fonts } from '@/styles/variables';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  & img {
    cursor: pointer;
  }
`;

export const ContainerIcons = styled.div`
  display: flex;
  gap: 8px;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 200%;
  right: 6%;
  z-index: 999;
  width: 160px;
  background-color: ${colors.white};

  > div {
    background-color: ${colors.secondary};
    display: flex;
    justify-content: end;
  }

  ${media.mobile} {
    top: 152%;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  list-style: none;
  padding: 8px;
  border-radius: 0 0 8px 8px;
  border: 1px solid ${colors.lightShadow};
`;

export const Item = styled.li`
  font-size: ${fonts.sizes.xxsmall};
  line-height: 20px;
  cursor: pointer;
  color: ${colors.primary};

  > a {
    color: ${colors.primary};

    display: block;
    text-decoration: none;
    width: 100%;
  }
`;
