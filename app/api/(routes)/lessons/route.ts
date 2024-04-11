import { NextRequest } from 'next/server';
import { lessonsController } from '@/app/api/controllers/lessons/lessons';

export const GET = (req: NextRequest) => {
  return lessonsController.fetchLessons(req);
};

export const POST = (req: NextRequest) => lessonsController.createLesson(req);

export const DELETE = (req: NextRequest) =>
  lessonsController.deleteManyLessons(req);
