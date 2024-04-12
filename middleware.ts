import { Routes } from '@/app/utils/routes';

export { default } from 'next-auth/middleware';

export const config = { matcher: [Routes.USERS, Routes.LESSONS] };
