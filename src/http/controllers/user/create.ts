import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { MakeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUsersBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  })

  const { name, email, phone } = createUsersBodySchema.parse(request.body)

  try {
    const createUsersUseCase = MakeCreateUserUseCase()

     await createUsersUseCase.execute({
      name,
      email,
      phone,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
