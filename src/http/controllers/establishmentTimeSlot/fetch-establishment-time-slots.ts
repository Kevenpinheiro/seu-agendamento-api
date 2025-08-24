import { EstablishmentAlreadyExistsError } from '@/use-cases/errors/establishment-already-exists'
import { makeFetchEstablishmentTimeSlotsUseCase } from '@/use-cases/factories/make-establishment-fetch-time-slots-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function FetchEstablishmentTimeSlots(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const fetchEstablishmentTimeSlotsParamsSchema = z.object({
    establishmentId: z.string(),
  })

  const { establishmentId } = fetchEstablishmentTimeSlotsParamsSchema.parse(
    request.params,
  )

  try {
    const fetchEstablishmentTimeSlotsUseCase =
      makeFetchEstablishmentTimeSlotsUseCase()

    await fetchEstablishmentTimeSlotsUseCase.execute({
      establishmentId,
    })
  } catch (err) {
    if (err instanceof EstablishmentAlreadyExistsError) {
      return replay.status(409).send({ message: err.message })
    }

    throw err
  }

  return replay.status(200).send()
}
