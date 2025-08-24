import { FastifyInstance } from 'fastify'
import { createAppointment } from './create'
import { FetchAppointments } from './fetch'
import { DeleteAppointment } from './delete'

export async function AppointmentsRoutes(app: FastifyInstance) {
  app.post('/establishment/:userId/appointments/:establishmentId', createAppointment)

  app.get('/establishment/:establishmentId/appointments', FetchAppointments)
  app.delete('/establishment/:appointmentId/appointments', DeleteAppointment)
}
