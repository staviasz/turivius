import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';

interface IPrivateLayout {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: IPrivateLayout) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
