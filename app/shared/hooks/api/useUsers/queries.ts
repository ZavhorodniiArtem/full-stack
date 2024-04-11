import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createUser,
  deleteManyUsers,
  deleteUser,
  editUser,
  fetchUsers,
} from '@/app/shared/hooks/api/useUsers/requests';
import { UserBody } from '@/app/(pages)/users/components/UserModal/types';
import { USERS } from '@/app/shared/hooks/api/useUsers/constants';
import { queryClient } from '@/providers/TanstackProvider';
import { Filters } from './types';
import { Key } from 'react';

export function useFetchUsers() {
  return useQuery({
    queryKey: [USERS],
    queryFn: () => fetchUsers(),
  });
}

export function useFetchFilteredUsers() {
  return useMutation({
    mutationFn: (filters: Filters) => fetchUsers(filters),
    onSuccess: (data) => {
      queryClient.setQueryData([USERS], data);
    },
  });
}

export function useAddUser() {
  return useMutation({
    mutationFn: (body: UserBody) => createUser(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [USERS] });
    },
  });
}

export function useUpdateUser(id: number | string) {
  return useMutation({
    mutationFn: (body: UserBody) => editUser(body, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [USERS] });
    },
  });
}

export function useRemoveUser(id: number | string) {
  return useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [USERS] });
    },
  });
}

export function useRemoveManyUsers() {
  return useMutation({
    mutationFn: (ids: Key[]) => deleteManyUsers(ids),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [USERS] });
    },
  });
}
