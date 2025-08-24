import { PrismaEstablishmentRepository } from '@/repositories/prisma-repositories/prisma-establishment-repository'
import { CreateEstablishmentUseCase } from '../create-establishment'

export function makeCreateEstablishmentUseCase() {
  const prismaEstablishmentRepository = new PrismaEstablishmentRepository()
  const registerUseCase = new CreateEstablishmentUseCase(
    prismaEstablishmentRepository,
  )

  return registerUseCase
}
