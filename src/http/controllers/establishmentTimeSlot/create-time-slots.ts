import { TimeSlotAlreadyExistsError } from '@/use-cases/errors/time-slot-already-exists'
import { makeEstablishmentTimeSlotsUseCase } from '@/use-cases/factories/make-establishment-time-slots-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateTimeSlot(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createTimeSlotsParamsSchema = z.object({
    establishmentId: z.string(),
  })

  const { establishmentId } = createTimeSlotsParamsSchema.parse(request.params)

  const createTimeSlotsBodySchema = z.object({
    dayOfWeek: z.number(),
    startTime: z.string(),
    endTime: z.string(),
  })

  const { dayOfWeek, startTime, endTime } = createTimeSlotsBodySchema.parse(
    request.body,
  )

  try {
    const timeSlotUseCase = makeEstablishmentTimeSlotsUseCase()

    const createTimeSlot = await timeSlotUseCase.execute({
      establishmentId,
      dayOfWeek,
      startTime,
      endTime,
    })

    return replay.status(201).send(createTimeSlot)
  } catch (err) {
    if (err instanceof TimeSlotAlreadyExistsError) {
      return replay.status(409).send({ message: err.message })
    }

    throw err
  }
}
