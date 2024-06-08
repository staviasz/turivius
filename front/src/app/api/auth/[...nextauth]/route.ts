import { makeLogin } from '@/factories/services/makeLogin';
import type { NextAuthOptions, User } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
        },
        password: {
          label: 'password',
          type: 'password',
        },
        remember: {
          label: 'remember',
          type: 'checkbox',
        },
      },
      async authorize(credentials) {
        try {
          const { body } = await makeLogin({
            email: credentials!.email,
            password: credentials!.password,
            remember: Boolean(credentials!.remember),
          });
          const user: User = { ...body };

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, nextAuthOptions, handler as POST };
