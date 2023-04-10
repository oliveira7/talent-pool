import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod']).default('dev'),
  TABLE_NAME: z.enum(['talents-table-dev', 'talents-table-prod']).default('talents-table-dev'),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables.', _env.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = _env.data;