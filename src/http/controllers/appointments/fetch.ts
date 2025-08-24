import { makeFetchAppointmentsUseCase } from '@/use-cases/factories/make-fetch-appointments-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function FetchAppointments(
  request: FastifyRequest,
  replay: FastifyReply,
) {

  const FetchAppointmentsParamsSchema = z.object({
    establishmentId: z.string()
  })

  
  const { establishmentId } = FetchAppointmentsParamsSchema.parse(
    request.params,
  )

  const getAppointmentsUseCase = makeFetchAppointmentsUseCase()

  const { appointments } = await getAppointmentsUseCase.execute({
    establishmentId,
  })

  return replay.status(200).send({
    appointments,
  })
}
