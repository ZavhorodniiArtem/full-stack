import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { UserBody } from '@/app/(pages)/users/components/UserModal/types';
import { IUser, UserResponse } from '@/app/shared/hooks/api/useUsers/types';
import { queryDB } from '@/app/lib/db';
import { TableParams } from './types';

export function userService() {
  return {
    async getAllUsers(params: TableParams) {
      let queryString = `SELECT * FROM users`;

      if (params?.search?.length) {
        queryString += ` WHERE name LIKE '%${params.search}%'`;
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

      const users = await queryDB<UserResponse>({
        query: queryString,
        values: values,
      });

      const totalUsers = await queryDB<UserResponse>({
        query: 'SELECT COUNT(*) AS total FROM users',
        values: [],
      });

      const pageSize = params?.pageSize || 10;
      const totalPages = Math.ceil(totalUsers[0].total / pageSize);
      const sort = params.order
        ? { field: params.field, order: params.order }
        : null;

      return {
        data: users,
        page: params.page || 1,
        totalPages: totalPages,
        pageSize: pageSize,
        total: totalUsers[0].total,
        search: params.search || null,
        sort: sort,
      };
    },

    async getUserById(id: string | number) {
      const result = await queryDB<UserResponse>({
        query: 'SELECT * FROM users WHERE id = ?',
        values: [`${id}`],
      });
      const user = result as RowDataPacket[];
      return user.length > 0 ? (user[0] as IUser) : null;
    },

    async createUser({ name, email }: UserBody) {
      const result = await queryDB<UserResponse>({
        query: 'SELECT * FROM users WHERE email = ?',
        values: [email],
      });
      const existingUser = result as RowDataPacket[];

      if (existingUser && existingUser.length > 0) {
        throw new Error('User with this email already exists');
      }

      const insertResult = await queryDB<UserResponse>({
        query:
          'INSERT INTO users (name, email, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
        values: [name, email],
      });

      const { insertId } = insertResult as unknown as ResultSetHeader;

      const newUserResult = await queryDB<UserResponse>({
        query: 'SELECT * FROM users WHERE id = ?',
        values: [`${insertId}`],
      });

      if (!Array.isArray(newUserResult) || newUserResult.length === 0) {
        throw new Error('Failed to retrieve the newly created user');
      }

      return newUserResult[0];
    },

    updateUser: async (userId: string, data: UserBody) => {
      await queryDB<UserResponse>({
        query: 'UPDATE users SET name = ?, email = ? WHERE id = ?',
        values: [data.name, data.email, userId],
      });
    },

    async deleteUser(id: string | undefined) {
      await queryDB<UserResponse>({
        query: 'DELETE FROM users WHERE id = ?',
        values: [`${id}`],
      });
    },

    async deleteManyUsers(ids: string[]) {
      const placeholders = ids.map(() => '?').join(',');

      const query = `DELETE FROM users WHERE id IN (${placeholders})`;

      await queryDB<UserResponse>({
        query,
        values: ids,
      });
    },
  };
}
