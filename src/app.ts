import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { env } from './env'
import { AppointmentsRoutes } from './http/controllers/appointments/routes'
import { UserRoutes } from './http/controllers/user/routes'
import { EstablishmentTimeSlotRoutes } from './http/controllers/establishmentTimeSlot/routes'
import { EstablishmentRoutes } from './http/controllers/establishment/routes'

export const app = fastify()

app.register(cookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(UserRoutes)
app.register(EstablishmentRoutes)
app.register(AppointmentsRoutes)
app.register(EstablishmentTimeSlotRoutes)

app.setErrorHandler((error, _, replay) => {
  if (error instanceof ZodError) {
    return replay
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return replay.status(500).send({ message: 'Internal server error.' })
})
