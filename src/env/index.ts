import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  API_BASE_URL: z.string().url().min(1),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),
  JWT_SECRET: z.string(),
  AUTH_REDIRECT_URL: z.string().url().min(1),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variable.', _env.error.format())

  throw new Error('Invalid environment variable.')
}

export const env = _env.data
