import { FastifyInstance } from 'fastify'
import { CreateTimeSlot } from './create-time-slots'
import { FetchEstablishmentTimeSlots } from './fetch-establishment-time-slots'

export async function EstablishmentTimeSlotRoutes(app: FastifyInstance) {
  // Create
  app.post('/establishment/:establishmentId/time-slots', CreateTimeSlot)

  // fetch
  app.get(
    '/establishment/:establishmentId/time-slots',
    FetchEstablishmentTimeSlots,
  )
}
