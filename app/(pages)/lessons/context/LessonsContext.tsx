import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { ILessons } from '@/app/shared/hooks/api/useLessons/types';

const LessonsContext = createContext<ILessons>({} as never);

export const LessonsContextProvider: FC<
  PropsWithChildren<{
    lessons: ILessons;
  }>
> = ({ children, lessons }) => {
  return (
    <LessonsContext.Provider value={lessons}>
      {children}
    </LessonsContext.Provider>
  );
};

export default function useLessonsContext() {
  const context = useContext(LessonsContext);

  if (context === undefined) {
    throw new Error(
      'useLessonsContext must be used with in a LessonsContextProvider'
    );
  }

  return context;
}
