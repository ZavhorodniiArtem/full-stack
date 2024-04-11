import mysql from 'mysql2/promise';

export const settings = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
});

interface IQueryParams {
  query: string;
  values: string[];
}

export async function queryDB<T>({
  query,
  values = [],
}: IQueryParams): Promise<T[]> {
  try {
    const conn = await settings.getConnection();
    const [results] = await conn.execute(query, values);
    conn.release();
    return results as unknown as T[];
  } catch (error) {
    console.error(`Ошибка при выполнении запроса: ${query}`, error);
    throw error;
  }
}
