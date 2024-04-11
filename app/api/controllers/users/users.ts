import { userService } from '@/app/api/services/users/userService';
import { NextRequest, NextResponse } from 'next/server';
import { UserBody } from '@/app/(pages)/users/components/UserModal/types';
import { UserResponse } from '@/app/shared/hooks/api/useUsers/types';
import { IUsersResponse } from '@/app/api/(routes)/users/types';
import { Params } from './constants';

export const usersController = {
  async fetchUsers(req: NextRequest) {
    try {
      const params = {
        search: req.nextUrl.searchParams.get(Params.SEARCH),
        order: req.nextUrl.searchParams.get(Params.ORDER),
        field: req.nextUrl.searchParams.get(Params.FIELD),
        pageSize: Number(req.nextUrl.searchParams.get(Params.PAGE_SIZE)),
        page: Number(req.nextUrl.searchParams.get(Params.PAGE)),
      };

      const users = await userService().getAllUsers(params);

      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      console.error('Error fetching users data:', error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },

  async createUser(req: NextRequest) {
    const { name, email }: UserBody = (await req.json()) as UserBody;

    try {
      if (!name || !email) {
        return NextResponse.json(
          { error: 'Name and email are required' },
          { status: 400 }
        );
      }

      const newUser: UserResponse = await userService().createUser({
        name,
        email,
      });

      return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },

  async deleteUser(res: IUsersResponse) {
    const userId = res.params.id;

    try {
      const existingUser = await userService().getUserById(userId);

      if (!existingUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      await userService().deleteUser(userId);

      return NextResponse.json(
        { message: 'User deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },

  async deleteManyUsers(req: NextRequest) {
    try {
      const ids = (await req.json()) as string[];

      await userService().deleteManyUsers(ids);

      return NextResponse.json(
        { message: 'Users deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting users:', error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },

  async updateUser(req: NextRequest, res: IUsersResponse) {
    const { name, email }: UserBody = (await req.json()) as UserBody;
    const userId = res.params.id;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are mandatory for update' },
        { status: 400 }
      );
    }

    try {
      const existingUser = await userService().getUserById(userId);

      if (!existingUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      await userService().updateUser(userId, { name, email });

      return NextResponse.json(
        { message: 'User updated successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },
};
