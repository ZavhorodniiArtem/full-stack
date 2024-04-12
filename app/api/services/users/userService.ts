import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { UserBody } from '@/app/(pages)/users/components/UserModal/types';
import {
  IUser,
  IUserWithPass,
  UserResponse,
} from '@/app/shared/hooks/api/useUsers/types';
import { queryDB } from '@/app/lib/db';
import { TableParams } from './types';
import bcrypt from 'bcrypt';

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

      const users = await queryDB<IUserWithPass>({
        query: queryString,
        values: values,
      });

      const totalUsers = await queryDB<{ total: number }>({
        query: 'SELECT COUNT(*) AS total FROM users',
        values: [],
      });

      const usersWithoutPass: IUser[] = users.map((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
      });

      const pageSize = params?.pageSize || 10;
      const totalPages = Math.ceil(totalUsers[0].total / pageSize);
      const sort = params.order
        ? { field: params.field, order: params.order }
        : null;

      return {
        data: usersWithoutPass,
        page: params.page || 1,
        totalPages: totalPages,
        pageSize: pageSize,
        total: totalUsers[0].total,
        search: params.search || null,
        sort: sort,
      };
    },

    async getUserById(id: string | number) {
      const user = await queryDB<IUserWithPass>({
        query: 'SELECT * FROM users WHERE id = ?',
        values: [`${id}`],
      });

      if (!user) return null;

      return user[0];
    },

    async getUserByEmail(email: string) {
      const user = await queryDB<IUserWithPass>({
        query: 'SELECT * FROM users WHERE email = ?',
        values: [email],
      });

      if (!user) return null;

      return user[0];
    },

    async createUser({ name, email, password }: UserBody) {
      const result = await queryDB<UserResponse>({
        query: 'SELECT * FROM users WHERE email = ?',
        values: [email],
      });
      const existingUser = result as RowDataPacket[];

      if (existingUser && existingUser.length > 0) {
        throw new Error('User with this email already exists');
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const insertResult = await queryDB<UserResponse>({
        query:
          'INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
        values: [name, email, hashedPassword],
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
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      await queryDB<IUserWithPass>({
        query:
          'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
        values: [data.name, data.email, hashedPassword, userId],
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
