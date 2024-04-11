import httpClient from '@/app/lib/api';
import { GET_USERS } from '@/app/shared/hooks/api/useUsers/constants';
import { Filters, UserResponse } from '@/app/shared/hooks/api/useUsers/types';
import {
  UserBody,
  UserParams,
} from '@/app/(pages)/users/components/UserModal/types';
import { requestError } from '@/app/shared/helpers/requestError';
import { setParams } from '@/app/shared/helpers/setParams';
import { Key } from 'react';

export const fetchUsers = async (filters?: Filters) => {
  try {
    const params: UserParams = setParams(filters);
    const response = await httpClient.get<UserResponse>(GET_USERS, {
      params,
    });

    return response?.data;
  } catch (error) {
    requestError(error);
  }
};

export const createUser = async (body: UserBody) => {
  try {
    return await httpClient.post(GET_USERS, body);
  } catch (error) {
    requestError(error);
  }
};

export const editUser = async (body: UserBody, id: number | string) => {
  try {
    return await httpClient.put(`${GET_USERS}/${id}`, body);
  } catch (error) {
    requestError(error);
  }
};

export const deleteUser = async (id: number | string) => {
  try {
    return await httpClient.delete(`${GET_USERS}/${id}`, { data: id });
  } catch (error) {
    requestError(error);
  }
};

export const deleteManyUsers = async (ids: Key[]) => {
  try {
    return await httpClient.delete(GET_USERS, { data: ids });
  } catch (error) {
    requestError(error);
  }
};
