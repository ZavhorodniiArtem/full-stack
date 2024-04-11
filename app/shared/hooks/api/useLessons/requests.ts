import httpClient from '@/app/lib/api';
import { requestError } from '@/app/shared/helpers/requestError';
import { setParams } from '@/app/shared/helpers/setParams';
import {
  Filters,
  LessonsParams,
  LessonsResponse,
} from '@/app/shared/hooks/api/useLessons/types';
import { GET_LESSONS } from '@/app/shared/hooks/api/useLessons/constants';
import { LessonBody } from '@/app/(pages)/lessons/components/LessonModal/types';
import { GET_USERS } from '@/app/shared/hooks/api/useUsers/constants';
import { Key } from 'react';

export const fetchLessons = async (filters?: Filters) => {
  try {
    const params: LessonsParams = setParams(filters);
    const response = await httpClient.get<LessonsResponse>(GET_LESSONS, {
      params,
    });

    return response?.data;
  } catch (error) {
    requestError(error);
  }
};

export const createLesson = async (body: LessonBody) => {
  try {
    return await httpClient.post(GET_LESSONS, body);
  } catch (error) {
    requestError(error);
  }
};

export const editLesson = async (body: LessonBody, id: number | string) => {
  try {
    return await httpClient.put(`${GET_LESSONS}/${id}`, body);
  } catch (error) {
    requestError(error);
  }
};

export const deleteLesson = async (id: number | string) => {
  try {
    return await httpClient.delete(`${GET_LESSONS}/${id}`, { data: id });
  } catch (error) {
    requestError(error);
  }
};

export const deleteManyLessons = async (ids: Key[]) => {
  try {
    return await httpClient.delete(GET_LESSONS, { data: ids });
  } catch (error) {
    requestError(error);
  }
};
