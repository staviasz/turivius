'use client';

import Title from '@/components/Title';
import makeLogout from '@/factories/services/makeLogout';
import { signOut, useSession } from 'next-auth/react';
import type { IMenuItem } from './MenuHeader';
import MenuHeader from './MenuHeader';
import * as S from './styles';

export default function Header() {
  const { data: session } = useSession();

  const menuItems: IMenuItem[] = [
    {
      name: 'Sair da conta',
      id: 4,
      onClick: async () => {
        await makeLogout(session?.user?.access_token);
        await signOut({ callbackUrl: '/' });
      },
    },
  ];

  return (
    <S.Header>
      <div className="container-main">
        <Title>Turivius</Title>
        {!!session?.user && <MenuHeader menuItems={menuItems} />}
      </div>
    </S.Header>
  );
}
