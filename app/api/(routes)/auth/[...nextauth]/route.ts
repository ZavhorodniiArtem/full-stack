import NextAuth from 'next-auth';
import { authOptions } from './authOptions';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
