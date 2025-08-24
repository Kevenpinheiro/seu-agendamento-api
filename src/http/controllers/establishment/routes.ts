import { FastifyInstance } from 'fastify'
import { CreateEstablishment } from './create'

export async function EstablishmentRoutes(app: FastifyInstance) {
  // Create
  app.post('/establishment', CreateEstablishment)
}
