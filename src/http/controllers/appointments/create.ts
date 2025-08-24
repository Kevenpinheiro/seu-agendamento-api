import { makeAppointmentsUseCase } from '@/use-cases/factories/make-appointments-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createAppointment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createAppointmentParamsSchema = z.object({
    establishmentId: z.string(),
    userId: z.string(),
  })

  const createAppointmentBodySchema = z.object({
    timeSlotId: z.string(),
  })

  const { timeSlotId } = createAppointmentBodySchema.parse(
    request.body,
  )

  const { establishmentId, userId } = createAppointmentParamsSchema.parse(
    request.params,
  )

  try {
    const appointmentsUseCase = makeAppointmentsUseCase()

    await appointmentsUseCase.execute({
      establishmentId,
      userId,
      timeSlotId,
    })
  
    return reply.status(201).send()
    
  } catch (err) {
    return reply.status(500).send({ message: 'Tivemos um problema interno' })
  }
}
