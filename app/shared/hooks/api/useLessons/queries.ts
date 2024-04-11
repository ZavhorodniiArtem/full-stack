import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/providers/TanstackProvider';
import { Filters } from './types';
import { LESSONS } from '@/app/shared/hooks/api/useLessons/constants';
import {
  createLesson,
  deleteLesson,
  deleteManyLessons,
  editLesson,
  fetchLessons,
} from '@/app/shared/hooks/api/useLessons/requests';
import { LessonBody } from '@/app/(pages)/lessons/components/LessonModal/types';
import {
  deleteManyUsers,
  deleteUser,
} from '@/app/shared/hooks/api/useUsers/requests';
import { USERS } from '@/app/shared/hooks/api/useUsers/constants';
import { Key } from 'react';

export function useFetchLessons() {
  return useQuery({
    queryKey: [LESSONS],
    queryFn: () => fetchLessons(),
  });
}

export function useFetchFilteredLessons() {
  return useMutation({
    mutationFn: (filters: Filters) => fetchLessons(filters),
    onSuccess: (data) => {
      queryClient.setQueryData([LESSONS], data);
    },
  });
}

export function useAddLesson() {
  return useMutation({
    mutationFn: (body: LessonBody) => createLesson(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [LESSONS] });
    },
  });
}

export function useUpdateLesson(id: number | string) {
  return useMutation({
    mutationFn: (body: LessonBody) => editLesson(body, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [LESSONS] });
    },
  });
}

export function useRemoveLesson(id: number | string) {
  return useMutation({
    mutationFn: () => deleteLesson(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [LESSONS] });
    },
  });
}

export function useRemoveManyLessons() {
  return useMutation({
    mutationFn: (ids: Key[]) => deleteManyLessons(ids),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [LESSONS] });
    },
  });
}
