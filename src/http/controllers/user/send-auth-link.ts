import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { MakeSendAuthLinkUseCase } from '@/use-cases/factories/make-send-auth-link-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function SendAuthLink(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sendAuthLinkBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = sendAuthLinkBodySchema.parse(request.body)

  try {
    const sendAuthLinkUseCase = MakeSendAuthLinkUseCase()

    await sendAuthLinkUseCase.execute({
      email,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
