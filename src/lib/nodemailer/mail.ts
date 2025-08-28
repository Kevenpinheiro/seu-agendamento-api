import nodemailer from 'nodemailer'
import { env } from '@/env'

export const mail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "contato.kevenpinheiro@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});
