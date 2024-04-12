import { NextRequest, NextResponse } from 'next/server';
import { lessonsService } from '@/app/api/services/lessons/lessonsService';
import { LessonBody } from '@/app/(pages)/lessons/components/LessonModal/types';
import { ILessons } from '@/app/shared/hooks/api/useLessons/types';
import { ILessonResponse } from '@/app/api/(routes)/lessons/types';
import { extractAndValidateParams } from '@/app/api/services/extractAndValidateParams/extractAndValidateParams';

export const lessonsController = {
  async fetchLessons(req: NextRequest) {
    try {
      const params = extractAndValidateParams(req);

      const lessons = await lessonsService().getAllLessons(params);

      return NextResponse.json(lessons, { status: 200 });
    } catch (error) {
      console.error('Error fetching lessons data:', error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },

  async createLesson(req: NextRequest) {
    const { author, description, title, link }: LessonBody =
      (await req.json()) as LessonBody;

    try {
      if (!author || !description || !title || !link) {
        return NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        );
      }

      const newLesson: ILessons = await lessonsService().createLesson({
        author,
        description,
        title,
        link,
      });

      return NextResponse.json(newLesson, { status: 201 });
    } catch (error) {
      console.error('Error creating lesson:', error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },

  async deleteLesson(res: ILessonResponse) {
    const lessonId = res.params.id;

    try {
      const existingLesson = await lessonsService().getLessonById(lessonId);

      if (!existingLesson) {
        return NextResponse.json(
          { error: 'Lesson not found' },
          { status: 404 }
        );
      }

      await lessonsService().deleteLesson(lessonId);

      return NextResponse.json(
        { message: 'Lesson deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting lesson:', error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },

  async updateLesson(req: NextRequest, res: ILessonResponse) {
    const { author, description, link, title }: LessonBody =
      (await req.json()) as LessonBody;
    const lessonId = res.params.id;

    if (!author || !description || !title || !link) {
      return NextResponse.json(
        { error: 'All fields are mandatory for update' },
        { status: 400 }
      );
    }

    try {
      const existingLesson = await lessonsService().getLessonById(lessonId);

      if (!existingLesson) {
        return NextResponse.json(
          { error: 'Lesson not found' },
          { status: 404 }
        );
      }

      await lessonsService().updateLesson(lessonId, {
        author,
        title,
        description,
        link,
      });

      return NextResponse.json(
        { message: 'User updated successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },

  async deleteManyLessons(req: NextRequest) {
    try {
      const ids = (await req.json()) as string[];

      await lessonsService().deleteManyLessons(ids);

      return NextResponse.json(
        { message: 'Lessons deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting lessons:', error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },
};
