'use client';

import { SLink, SLinksList, SSidebar } from './style';
import { Routes } from '@/app/utils/routes';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const path = usePathname();

  //if (path === Routes.LOGIN.toString()) return;

  return (
    <SSidebar>
      <SLinksList>
        <SLink href={Routes.USERS}>Users</SLink>
        <SLink href={Routes.LESSONS}>Lessons</SLink>
      </SLinksList>

      <SLink href={Routes.LOGIN}>LOGOUT</SLink>
    </SSidebar>
  );
};

export default Sidebar;
