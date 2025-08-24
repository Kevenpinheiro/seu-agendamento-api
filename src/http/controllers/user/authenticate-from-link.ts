import { AuthLinkExpiredError } from '@/use-cases/errors/auth-link-expired'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeAuthenticateFromLinkUseCase } from '@/use-cases/factories/make-authenticate-from-link-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function AuthenticateFromLink(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateFromLinkQuerySchema = z.object({
    code: z.string(),
    redirect: z.string(),
  })

  const { code, redirect } = authenticateFromLinkQuerySchema.parse(
    request.query,
  )

  try {
    const authenticateFromLinkUseCase = makeAuthenticateFromLinkUseCase()

    const { userId } = await authenticateFromLinkUseCase.execute({
      code,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: userId,
          expiresIn: 60 * 60 * 24 * 7, // 7 days
        },
      },
    )

    return reply
      .setCookie('auth', token, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .redirect(redirect)
  } catch (err) {
    if (
      err instanceof UserAlreadyExistsError ||
      err instanceof AuthLinkExpiredError
    ) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
