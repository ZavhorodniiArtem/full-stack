import { NextResponse } from 'next/server';

export interface IUsersResponse extends NextResponse {
  params: {
    id: string;
  };
}
