import { NextRequest } from 'next/server';
import { usersController } from '@/app/api/controllers/users/users';
import { IUsersResponse } from '@/app/api/(routes)/users/types';

export const DELETE = (_: NextRequest, res: IUsersResponse) =>
  usersController.deleteUser(res);

export const PUT = (req: NextRequest, res: IUsersResponse) =>
  usersController.updateUser(req, res);
