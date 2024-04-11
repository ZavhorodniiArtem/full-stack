import { NextResponse } from 'next/server';

export interface ILessonResponse extends NextResponse {
  params: {
    id: string;
  };
}
