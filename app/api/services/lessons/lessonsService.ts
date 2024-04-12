import { queryDB } from '@/app/lib/db';
import { TableParams } from './types';
import { ILessons } from '@/app/shared/hooks/api/useLessons/types';
import { ResultSetHeader } from 'mysql2/promise';
import { LessonBody } from '@/app/(pages)/lessons/components/LessonModal/types';

export function lessonsService() {
  return {
    async getAllLessons(params: TableParams) {
      let queryString = `SELECT * FROM lessons`;

      if (params?.search?.length) {
        queryString += ` WHERE author LIKE '%${params.search}%' OR title LIKE '%${params.search}%'`;
      }

      if (params.order) {
        queryString += ` ORDER BY ${params.field} ${params.order}`;
      }

      if (params.page) {
        const pageSize = params.pageSize || 10;
        const offset = (params.page - 1) * pageSize;
        queryString += ` LIMIT ${pageSize} OFFSET ${offset}`;
      }

      const values = params.search ? [`%${params.search}%`] : [];

      const lessons = await queryDB<ILessons>({
        query: queryString,
        values: values,
      });

      const totalLessons = await queryDB<{ total: number }>({
        query: 'SELECT COUNT(*) AS total FROM lessons',
        values: [],
      });

      const pageSize = params?.pageSize || 10;
      const totalPages = Math.ceil(totalLessons[0].total / pageSize);
      const sort = params.order
        ? { field: params.field, order: params.order }
        : null;

      return {
        data: lessons,
        page: params.page || 1,
        totalPages: totalPages,
        pageSize: pageSize,
        total: totalLessons[0].total,
        search: params.search || null,
        sort: sort,
      };
    },

    async getLessonById(id: string | number) {
      const lesson = await queryDB<ILessons>({
        query: 'SELECT * FROM lessons WHERE id = ?',
        values: [`${id}`],
      });

      if (!lesson) return null;

      return lesson;
    },

    async createLesson({ author, description, title, link }: LessonBody) {
      const insertResult = await queryDB<ILessons>({
        query:
          'INSERT INTO lessons (author, description, title, link, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
        values: [author, description, title, link],
      });

      const { insertId } = insertResult as unknown as ResultSetHeader;

      const newLessonResult = await queryDB<ILessons>({
        query: 'SELECT * FROM lessons WHERE id = ?',
        values: [`${insertId}`],
      });

      if (!Array.isArray(newLessonResult) || newLessonResult.length === 0) {
        throw new Error('Failed to retrieve the newly created user');
      }

      return newLessonResult[0];
    },

    updateLesson: async (lessonId: string, data: LessonBody) => {
      await queryDB<ILessons>({
        query:
          'UPDATE lessons SET author = ?, title = ?, description = ?, link = ? WHERE id = ?',
        values: [
          data.author,
          data.title,
          data.description,
          data.link,
          lessonId,
        ],
      });
    },

    async deleteLesson(id: string | undefined) {
      await queryDB<ILessons>({
        query: 'DELETE FROM lessons WHERE id = ?',
        values: [`${id}`],
      });
    },

    async deleteManyLessons(ids: string[]) {
      const placeholders = ids.map(() => '?').join(',');

      const query = `DELETE FROM lessons WHERE id IN (${placeholders})`;

      await queryDB<ILessons>({
        query,
        values: ids,
      });
    },
  };
}
