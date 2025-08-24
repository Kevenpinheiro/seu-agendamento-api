import { FastifyRequest } from 'fastify'

export async function getEstablishmentFromCookie(request: FastifyRequest) {
  const establishmentId = request.cookies.auth

  if (!establishmentId) {
    throw new Error('Não autorizado.')
  }


  try {
    await request.jwtVerify<{
      sub: string
    }>()
    return { establishmentId }
  } catch (error) {
    throw new Error('Não autorizado.')
  }
}
