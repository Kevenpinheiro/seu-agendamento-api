import { FastifyInstance } from 'fastify'
import { SendAuthLink } from '../user/send-auth-link'
import { AuthenticateFromLink } from '../user/authenticate-from-link'
import { CreateUsers } from './create'

export async function UserRoutes(app: FastifyInstance) {
  // register
  app.post('/users', CreateUsers)

  // authenticate
  app.post('/authenticate', SendAuthLink)
  app.get('/auth-links/authenticate', AuthenticateFromLink)
}
