import { NextRequest } from 'next/server';
import { usersController } from '@/app/api/controllers/users/users';

export const GET = (req: NextRequest) => {
  return usersController.fetchUsers(req);
};

export const POST = (req: NextRequest) => usersController.createUser(req);

export const DELETE = (req: NextRequest) =>
  usersController.deleteManyUsers(req);
