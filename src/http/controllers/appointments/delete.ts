import { makeDeleteAppointmentUseCase } from '@/use-cases/factories/make-delete-appointment-use-case'
import { FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'

export function DeleteAppointment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteAppointmentParamsSchema = z.object({
    appointmentId: z.string(),
  })

  const { appointmentId } = deleteAppointmentParamsSchema.parse(request.params)

  const deleteAppointmentUseCase = makeDeleteAppointmentUseCase()

  deleteAppointmentUseCase.execute({
    appointmentId,
  })

  return reply.status(204).send()
}
