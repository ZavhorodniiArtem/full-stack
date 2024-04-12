'use client';

import { SLink, SLinksList, SSidebar } from './style';
import { Routes } from '@/app/utils/routes';
import { useSession, signOut } from 'next-auth/react';

const Sidebar = () => {
  const session = useSession();

  console.log('session', session);

  return (
    <SSidebar>
      <SLinksList>
        <SLink href={Routes.USERS}>Users</SLink>
        <SLink href={Routes.LESSONS}>Lessons</SLink>
      </SLinksList>

      {session?.data && (
        <SLink
          href='#'
          onClick={() => signOut({ callbackUrl: Routes.SIGN_IN })}
        >
          Sign out
        </SLink>
      )}
    </SSidebar>
  );
};

export default Sidebar;
