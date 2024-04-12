import { NextRequest } from 'next/server';
import { RequestParams } from './types';
import z from 'zod';
import { Params } from './constants';

export const ParamsSchema = z.object({
  search: z.string().nullable().optional(),
  order: z.string().nullable().optional(),
  field: z.string().nullable().optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
  page: z.number().int().min(1).optional(),
});

const validateParams = (params: RequestParams) => {
  const isValid = ParamsSchema.safeParse(params);
  if (isValid.success) {
    return isValid.data;
  } else {
    throw new Error(isValid.error.errors.map((err) => err.message).join('\n'));
  }
};

export const extractAndValidateParams = (req: NextRequest): RequestParams => {
  const search = req.nextUrl.searchParams.get(Params.SEARCH);
  const order = req.nextUrl.searchParams.get(Params.ORDER);
  const field = req.nextUrl.searchParams.get(Params.FIELD);
  const pageSize = Number(req.nextUrl.searchParams.get(Params.PAGE_SIZE));
  const page = Number(req.nextUrl.searchParams.get(Params.PAGE));

  return validateParams({ search, order, field, pageSize, page });
};
