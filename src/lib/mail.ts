import nodemailer from 'nodemailer'
import { env } from '@/env'

export const mail = nodemailer.createTransport({
  service: 'hotmail',
  port: 587,
  secure: false,
  debug: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
})
