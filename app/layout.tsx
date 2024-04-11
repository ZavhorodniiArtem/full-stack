import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TanstackProvider from '@/providers/TanstackProvider';
import StyledComponentsRegistry from '@/app/lib/registry';
import Sidebar from '@/app/shared/components/Sidebar';
import { Flex } from 'antd';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Main',
  description: 'Main page',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <SessionProvider>
        <TanstackProvider>
          <StyledComponentsRegistry>
            <body className={inter.className}>
              <Flex>
                <Sidebar />
                <div style={{ width: '100%', margin: '16px' }}>{children}</div>
              </Flex>
            </body>
          </StyledComponentsRegistry>
        </TanstackProvider>
      </SessionProvider>
    </html>
  );
}
