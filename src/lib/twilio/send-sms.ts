import { env } from '@/env'
import twilio from 'twilio'

const accountSid = env.TWILIO_ACCOUNT_SID
const authToken = env.TWILIO_AUTH_TOKEN
const from = env.TWILIO_PHONE_NUMBER

const client = twilio(accountSid, authToken)

export async function sendSMS(userPhone: string) {
  try {
    const sendMessage = await client.messages.create({
      body: 'Agendamento marcado com sucesso!',
      from,
      to: userPhone,
    })
    return sendMessage
  } catch (error) {
    console.error('Erro ao enviar SMS', error)
  }
}
