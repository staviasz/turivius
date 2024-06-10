'use client';

import closeMenuIcon from '@public/icons/closeMenuHeader.svg';
import hamburguerIcon from '@public/icons/hamburguer.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import * as S from './styles';

export interface IMenuItem {
  name: string;
  id: number;
  url?: string;
  onClick?: () => void;
}

export interface IMenuHeader {
  menuItems: IMenuItem[];
}

export default function MenuHeader({ menuItems }: IMenuHeader) {
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <S.Container>
      <S.ContainerIcons>
        <Image
          src={hamburguerIcon}
          alt="abrir menu"
          role="icon"
          onClick={() => setIsShowMenu(true)}
        />
      </S.ContainerIcons>
      {isShowMenu && (
        <S.Wrapper>
          <div>
            <Image
              src={closeMenuIcon}
              alt="fechar menu"
              onClick={() => setIsShowMenu(false)}
              role="icon"
            />
          </div>
          <S.List>
            {menuItems.map(menuItem => (
              <S.Item key={menuItem.id}>
                {!menuItem.onClick && menuItem.url && (
                  <Link href={menuItem.url}>{menuItem.name}</Link>
                )}
                {menuItem.onClick && <p onClick={menuItem.onClick}>{menuItem.name}</p>}
              </S.Item>
            ))}
          </S.List>
        </S.Wrapper>
      )}
    </S.Container>
  );
}
