'use client';

import { colors, fonts } from '@/styles/variables';
import Link from 'next/link';
import styled from 'styled-components';

export const ButtonSecondary = styled.button`
  background-color: ${colors.secondary};
  max-width: 360px;
  width: 100%;
  color: ${colors.primary};
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: ${fonts.sizes.small};

  &:hover {
    font-weight: bold;
  }
`;

export const LinkNext = styled(Link)`
  max-width: 360px;
  width: 100%;
`;
