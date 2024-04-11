import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { IUser } from '@/app/shared/hooks/api/useUsers/types';

const UsersContext = createContext<IUser>({} as never);

export const UsersContextProvider: FC<
  PropsWithChildren<{
    user: IUser;
  }>
> = ({ children, user }) => {
  return <UsersContext.Provider value={user}>{children}</UsersContext.Provider>;
};

export default function useUsersContext() {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error(
      'useUsersContext must be used with in a UsersContextProvider'
    );
  }

  return context;
}
