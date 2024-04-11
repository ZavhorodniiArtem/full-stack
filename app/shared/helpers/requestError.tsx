import { AxiosError } from 'axios';
import { message } from 'antd';

export const requestError = (error: unknown) => {
  if ((error as AxiosError)?.message) {
    void message.error((error as AxiosError).message);
  }
  throw error;
};
