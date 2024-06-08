'use client';

import { SessionProvider } from 'next-auth/react';

interface ISessionProviderProps {
  children: React.ReactNode;
}

export default function NextSessionProvider({ children }: ISessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
