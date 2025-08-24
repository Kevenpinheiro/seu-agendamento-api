import { EstablishmentAlreadyExistsError } from '@/use-cases/errors/establishment-already-exists'
import { makeCreateEstablishmentUseCase } from '@/use-cases/factories/make-create-establishment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateEstablishment(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createEstablishmentBodySchema = z.object({
    managerId: z.string(),
    name: z.string(),
    description: z.string(),
  })

  const { managerId, name, description } =
    createEstablishmentBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateEstablishmentUseCase()

    await createUseCase.execute({
      managerId,
      name,
      description,
    })
  } catch (err) {
    if (err instanceof EstablishmentAlreadyExistsError) {
      return replay.status(409).send({ message: err.message })
    }

    throw err
  }

  return replay.status(201).send()
}
