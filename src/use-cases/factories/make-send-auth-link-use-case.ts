import { PrismaUserRepository } from '@/repositories/prisma-repositories/prisma-user-repository'
import { SendAuthLinkUseCase } from '../send-auth-link'
import { PrismaAuthLinkRepository } from '@/repositories/prisma-repositories/prisma-auth-link-repository'

export function MakeSendAuthLinkUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const prismaAuthLinkRepository = new PrismaAuthLinkRepository()

  const sendAuthLinkUseCase = new SendAuthLinkUseCase(
    prismaUserRepository,
    prismaAuthLinkRepository,
  )

  return sendAuthLinkUseCase
}
