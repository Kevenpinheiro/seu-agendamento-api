import { PrismaAuthLinkRepository } from '@/repositories/prisma-repositories/prisma-auth-link-repository'
import { AuthenticateFromLinkUseCase } from '../authenticate-from-link'

export function makeAuthenticateFromLinkUseCase() {
  const prismaAuthLinkRepository = new PrismaAuthLinkRepository()
  const authenticateFromLinkUseCase = new AuthenticateFromLinkUseCase(
    prismaAuthLinkRepository,
  )

  return authenticateFromLinkUseCase
}
