import { NextRequest } from 'next/server';
import { IUsersResponse } from '@/app/api/(routes)/users/types';
import { lessonsController } from '@/app/api/controllers/lessons/lessons';

export const DELETE = (_: NextRequest, res: IUsersResponse) =>
  lessonsController.deleteLesson(res);

export const PUT = (req: NextRequest, res: IUsersResponse) =>
  lessonsController.updateLesson(req, res);
